const express = require('express');
const router = express.Router();
const { Berita, BangunanDesa } = require('../models');

router.get('/sitemap.xml', async (req, res) => {
  try {
    const frontendUrl = process.env.CLIENT_ORIGIN || 'https://tenjonagara.id';
    const baseUrl = frontendUrl.replace(/\/+$/, '');

    // Ambil semua berita published
    let beritaList = [];
    try {
      beritaList = await Berita.findAll({
        where: { status: 'published' },
        attributes: ['slug', 'updated_at', 'created_at']
      });
    } catch (e) {
      console.warn('Gagal memuat berita untuk sitemap:', e.message);
    }

    // Ambil semua bangunan desa
    let bangunanList = [];
    try {
      bangunanList = await BangunanDesa.findAll({
        attributes: ['id', 'updated_at', 'created_at']
      });
    } catch (e) {
      console.warn('Gagal memuat bangunan untuk sitemap:', e.message);
    }

    const staticRoutes = [
      { loc: '', changefreq: 'daily', priority: '1.0' },
      { loc: '/profil', changefreq: 'monthly', priority: '0.9' },
      { loc: '/berita', changefreq: 'daily', priority: '0.9' },
      { loc: '/potensi', changefreq: 'weekly', priority: '0.8' },
      { loc: '/layanan', changefreq: 'monthly', priority: '0.8' },
      { loc: '/bangunan', changefreq: 'monthly', priority: '0.7' },
      { loc: '/statistik', changefreq: 'monthly', priority: '0.7' },
      { loc: '/kontak', changefreq: 'monthly', priority: '0.6' }
    ];

    const todayStr = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static Pages
    staticRoutes.forEach((route) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${route.loc}</loc>\n`;
      xml += `    <lastmod>${todayStr}</lastmod>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Dynamic Berita Pages
    beritaList.forEach((item) => {
      const dateVal = item.updated_at || item.created_at || new Date();
      const lastmod = new Date(dateVal).toISOString().split('T')[0];
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/berita/${encodeURIComponent(item.slug)}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    // Dynamic Bangunan Pages
    bangunanList.forEach((item) => {
      const dateVal = item.updated_at || item.created_at || new Date();
      const lastmod = new Date(dateVal).toISOString().split('T')[0];
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/bangunan/${item.id}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml; charset=utf-8');
    res.send(xml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating dynamic sitemap');
  }
});

module.exports = router;
