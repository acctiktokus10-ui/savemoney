// app/api/convert/route.js
import { NextResponse } from "next/server";

export const runtime = "edge";
export const preferredRegion = ["sin1", "hkg1"]; // Singapore + HK gần VN nhất

const AFFILIATE_ID = "17395950528";

// Dạng 1: /product/SHOPID/ITEMID hoặc /opaanlp/SHOPID/ITEMID
const RE_PRODUCT = /shopee\.vn\/(?:product|opaanlp)\/(\d+)\/(\d+)/;

// Dạng 2: slug kiểu i.SHOPID.ITEMID (phổ biến nhất khi share từ app)
const RE_SLUG = /[?&-]i\.(\d{6,})\.(\d{6,})|\.vn\/[^?#]*-i\.(\d{6,})\.(\d{6,})/;

// Dạng 3: ?shopid=&itemid= params
const RE_PARAMS = /[?&]shopid=(\d+)&(?:.*&)?itemid=(\d+)|[?&]itemid=(\d+)&(?:.*&)?shopid=(\d+)/;

// Short link patterns
const SHORT_RE = /shp\.ee|shope\.ee|(?:^|[^a-z])s\.shopee\.vn\/[A-Za-z0-9]|vn\.shp\.ee/;

function extractIds(url) {
  // Ưu tiên dạng /product/ hoặc /opaanlp/
  let m = url.match(RE_PRODUCT);
  if (m) return { shopId: m[1], productId: m[2] };

  // Dạng slug -i.SHOPID.ITEMID
  m = url.match(RE_SLUG);
  if (m) {
    const shopId   = m[1] || m[3];
    const productId = m[2] || m[4];
    if (shopId && productId) return { shopId, productId };
  }

  // Dạng ?shopid=&itemid=
  m = url.match(RE_PARAMS);
  if (m) {
    const shopId    = m[1] || m[4];
    const productId = m[2] || m[3];
    if (shopId && productId) return { shopId, productId };
  }

  return null;
}

function extractFromParams(raw) {
  // origin_link=... (affiliate link đã có sẵn)
  const m1 = raw.match(/origin_link=([^&]+)/);
  if (m1) {
    const ids = extractIds(decodeURIComponent(m1[1]));
    if (ids) return ids;
  }
  // next=... param
  const m2 = raw.match(/[?&]next=([^&]+)/);
  if (m2) {
    const ids = extractIds(decodeURIComponent(m2[1]));
    if (ids) return ids;
  }
  return null;
}

// Resolve short link với timeout 5s, thử HEAD trước rồi GET
async function resolveShortLink(url) {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(5000),
      headers: { "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15" },
    });
    if (res.url && res.url !== url) return res.url;
  } catch {}

  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(5000),
      headers: { "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15" },
    });
    return res.url || url;
  } catch {
    return url;
  }
}

async function parseLink(raw) {
  raw = raw.trim();

  // 1. Extract trực tiếp — không fetch, nhanh nhất
  const direct = extractIds(raw);
  if (direct) return direct;

  // 2. Từ URL params — không fetch
  const fromParams = extractFromParams(raw);
  if (fromParams) return fromParams;

  // 3. Short link — phải fetch
  if (SHORT_RE.test(raw)) {
    const resolved = await resolveShortLink(raw);
    if (resolved && resolved !== raw) {
      const ids = extractIds(resolved) || extractFromParams(resolved);
      if (ids) return ids;
    }
  }

  return null;
}

function buildAffiliate(shopId, productId, subId) {
  const origin = `https://shopee.vn/product/${shopId}/${productId}`;
  return {
    shopId,
    productId,
    originLink: origin,
    affiliateLink: `https://s.shopee.vn/an_redir?origin_link=${encodeURIComponent(origin)}&affiliate_id=${AFFILIATE_ID}&sub_id=${encodeURIComponent(subId)}`,
  };
}

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch {
    return NextResponse.json({ results: [] });
  }

  const subId = (body.subId || "guest").trim().slice(0, 64);
  const links = Array.isArray(body.links)
    ? body.links.slice(0, 10).map(l => String(l).trim()).filter(Boolean)
    : [];

  if (!links.length) return NextResponse.json({ results: [] });

  const results = await Promise.all(
    links.map(async (link) => {
      try {
        const ids = await parseLink(link);
        if (!ids) return { input: link, success: false, error: "Không tìm thấy sản phẩm trong link này" };
        return { input: link, success: true, ...buildAffiliate(ids.shopId, ids.productId, subId) };
      } catch (e) {
        return { input: link, success: false, error: String(e.message || "Lỗi không xác định") };
      }
    })
  );

  return NextResponse.json({ results }, {
    headers: { "Cache-Control": "no-store" },
  });
}
