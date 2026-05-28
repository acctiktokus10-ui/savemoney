// app/api/convert/route.js
import { NextResponse } from "next/server";

export const runtime = "edge";

const AFFILIATE_ID = "17395950528";
const PRODUCT_RE = /shopee\.vn\/(?:product|opaanlp)\/(\d+)\/(\d+)/;

function extractShopProduct(url) {
  const m = url.match(PRODUCT_RE);
  return m ? { shopId: m[1], productId: m[2] } : null;
}

async function resolveShortLink(url) {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (PRODUCT_RE.test(res.url)) return res.url;
  } catch {}
  const res = await fetch(url, {
    method: "GET",
    redirect: "follow",
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  return res.url;
}

async function parseLink(raw) {
  raw = raw.trim();
  let ids = extractShopProduct(raw);
  if (ids) return ids;

  const m1 = raw.match(/origin_link=([^&]+)/);
  if (m1) {
    ids = extractShopProduct(decodeURIComponent(m1[1]));
    if (ids) return ids;
  }

  const m2 = raw.match(/[?&]next=([^&]+)/);
  if (m2) {
    ids = extractShopProduct(decodeURIComponent(m2[1]));
    if (ids) return ids;
  }

  if (/shp\.ee|shope\.ee|s\.shopee\.vn|vn\.shp\.ee/.test(raw)) {
    try {
      const resolved = await resolveShortLink(raw);
      ids = extractShopProduct(resolved);
      if (ids) return ids;
    } catch {}
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
  try { body = await req.json(); } catch { return NextResponse.json({ results: [] }); }

  const subId = (body.subId || "guest").trim().slice(0, 64);
  const links = Array.isArray(body.links) ? body.links.slice(0, 10).filter(Boolean) : [];
  if (!links.length) return NextResponse.json({ results: [] });

  const results = await Promise.all(
    links.map(async (link) => {
      try {
        const ids = await parseLink(link);
        if (!ids) return { input: link, success: false, error: "Không tìm thấy sản phẩm trong link này" };
        return { input: link, success: true, ...buildAffiliate(ids.shopId, ids.productId, subId) };
      } catch (e) {
        return { input: link, success: false, error: e.message };
      }
    })
  );

  return NextResponse.json({ results });
}
