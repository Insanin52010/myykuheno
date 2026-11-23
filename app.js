/* kredit-maliki: Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id. Lisensi Nonkomersial Maliki Studio: wajib kredit, dilarang dijual (lihat LICENSE). */
/* Render beranda (index.html) & detail karya (karya.html?id=...) dari window.DATA, lalu gerak, glass bubble, & tema. */
(function () {
  'use strict';
  var D = window.DATA || {}, T = window.TEMA || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var html = document.documentElement;
  var REDUKSI = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NAMA = T.nama || D.nama || 'Portofolio';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function miring(s) { return esc(s).replace(/\{([^}]*)\}/g, '<span class="serif">$1</span>'); }
  function tebal(s) { return esc(s).replace(/\{([^}]*)\}/g, '<b>$1</b>'); }
  function polos(s) { return String(s || '').replace(/[{}]/g, ''); }

  var IK = {
    email: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    youtube: '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
    bintang: '<path d="M12 3v18"/><path d="M3 12h18"/><path d="m5.6 5.6 12.8 12.8"/><path d="m18.4 5.6-12.8 12.8"/>',
    megafon: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    tim: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    labu: '<path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"/><path d="M6.453 15h11.094"/><path d="M8.5 2h7"/>',
    grafik: '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    dokumen: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
    panah: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    laptop: '<rect width="18" height="12" x="3" y="4" rx="2"/><line x1="2" x2="22" y1="20" y2="20"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>'
  };
  function ikon(n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (IK[n] || IK.bintang) + '</svg>'; }
  function obj(src, cls, uk) { return src ? '<span class="obj ' + (cls || '') + '" aria-hidden="true"><img src="' + esc(src) + '" alt="" sizes="' + (uk || '200px') + '" loading="lazy" decoding="async"></span>' : ''; }
  function sampul(k) { return '<div class="cover gambar"><img src="' + esc(k.sampul) + '" alt="Sampul karya: ' + esc(polos(k.judul)) + '" width="900" height="600" loading="lazy"></div>'; }
  function urlKarya(k) { return 'karya.html?id=' + encodeURIComponent(k.id); }
  var karya = D.karya || [];
  var unggulan = karya.filter(function (k) { return k.unggulan; });
  var emailTujuan = D.email || 'insaninkamiliaannisaa@gmail.com';
  var emailUrl = 'mailto:' + emailTujuan;

  // ---------- Beranda ----------
  function beranda() {
    var sos = D.sosial || [];
    var klien = (D.klien || []).map(function (c) { return '<img src="' + esc(c.logo) + '" alt="" height="48"><span class="nama-klien">' + esc(c.nama) + '</span>' + ikon('bintang'); });
    var p = D.pernyataan || {};
    var chip = function (c) { return '<li class="chip" data-bagian="panel"><i>' + ikon(c.ikon) + '</i>' + esc(c.teks) + '</li>'; };
    var langkah = D.cara || [];
    var angka = D.angka || [];
    var sekolah = D.sekolah || [];
    var skill = D.skill || [];
    var bulan = function (x) { return x.selesai ? esc(x.mulai) + ikon('panah') + esc(x.selesai) : esc(x.mulai); };

    $('#main').innerHTML =
      '<section class="hero" aria-labelledby="hero-h"><div class="wrap">' +
        (D.lencana ? '<p class="badge rise">' + obj(D.lencana.objek, '', '42px').replace('loading="lazy"', 'loading="eager"') + esc(D.lencana.teks) + '</p>' : '') +
        '<h1 id="hero-h" data-bagian="teks"><span class="h-sans rise" style="--d:.05s">' + esc(D.sapaan) + '</span><span class="h-serif serif rise" style="--d:.12s">' + esc(polos(D.peran)) + '</span></h1>' +
        '<div class="stage"><div class="stage-side">' +
          (D.pil || []).map(function (t, i) { return '<p class="pill rise" style="--d:' + (.35 + i * .05) + 's" data-bagian="panel"><span class="dot' + (i ? ' ink' : '') + '" aria-hidden="true"></span>' + esc(t) + '</p>'; }).join('') +
          '<p class="trained rise" style="--d:.45s">' + tebal(D.latar) + '</p></div>' +
          '<div class="portrait-wrap">' + obj((karya[0] || {}).objek, 'float o-flask', '144px') + '<figure class="portrait rise" style="--d:.2s"><img src="' + esc(D.foto) + '" alt="' + esc(D.fotoAlt || D.nama) + '" width="512" height="640" fetchpriority="high"></figure></div>' +
          '<div class="stage-side right"><p class="lead rise" style="--d:.4s">' + esc(D.lead) + '</p><div class="hero-cta rise" style="--d:.5s">' +
          '<a class="btn glass-bubble" href="https://ekskul-khaki.vercel.app/" target="_blank" rel="noopener" data-bagian="utama">' + ikon('globe') + 'Website Ekskul</a>' +
          '<a class="btn ghost glass-bubble" href="#pendidikan">' + ikon('pin') + 'Lokasi Sekolah</a>' +
          '</div></div>' +
        '</div></div>' +
        (klien.length ? '<div class="marquee" aria-labelledby="mq-h"><p class="marquee-title" id="mq-h">' + esc(D.judulKlien) + '</p><ul class="marquee-track">' +
          klien.map(function (k) { return '<li>' + k + '</li>'; }).join('') + klien.map(function (k) { return '<li aria-hidden="true">' + k + '</li>'; }).join('') + '</ul></div>' : '') +
      '</section>' +

      '<section class="section statement" aria-labelledby="focus-h"><div class="wrap"><p class="hallo">' + esc(p.sapa) + '</p><div class="statement-grid">' +
        '<ul class="chips l">' + (p.kiri || []).map(chip).join('') + '</ul>' +
        '<h2 id="focus-h" class="big" data-words data-bagian="teks">' + esc(p.teks) + '</h2>' +
        '<ul class="chips r">' + (p.kanan || []).map(chip).join('') + '</ul></div></div></section>' +

      '<section class="section tight-top" id="karya" aria-labelledby="work-h"><div class="wrap"><p class="label">/ Karya & Proyek</p><h2 id="work-h" class="h2">' + miring((D.judulKarya || '').replace('{n}', unggulan.length)) + '</h2><div class="works">' +
        unggulan.map(function (k) {
          var tombolAksi = '';
          if (k.youtubeUrl) {
            tombolAksi = '<div class="work-live-row">' +
              '<a class="btn glass-bubble btn-sm" href="' + esc(k.youtubeUrl) + '" target="_blank" rel="noopener">' + ikon('youtube') + 'Tonton Sekarang</a>' +
              '<a class="btn ghost glass-bubble btn-sm" href="' + urlKarya(k) + '">Penjelasan' + ikon('panah') + '</a>' +
            '</div>';
          } else if (k.linkLive) {
            tombolAksi = '<div class="work-live-row">' +
              '<a class="btn glass-bubble btn-sm" href="' + esc(k.linkLive) + '" target="_blank" rel="noopener">' + ikon('globe') + esc(k.linkLabel || 'Buka Proyek') + '</a>' +
              '<a class="btn ghost glass-bubble btn-sm" href="' + urlKarya(k) + '">Detail Karya' + ikon('panah') + '</a>' +
            '</div>';
          }
          return '<article class="work-card-wrap"><a class="work" href="' + urlKarya(k) + '"><div class="work-media" data-bagian="panel">' + sampul(k) + obj(k.objek, 'float', '210px') + '</div>' +
            '<div class="work-meta"><h3>' + esc(polos(k.judul)) + '</h3><p>' + esc(k.klien) + ' · ' + esc(k.tahun) + '</p><div class="tags">' + (k.tag || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div></div></a>' +
            tombolAksi +
            '</article>';
        }).join('') + '</div></div></section>' +

      (sekolah.length ? '<section class="section" id="pendidikan" aria-labelledby="edu-h"><div class="wrap"><p class="label">/ Latar Belakang Pendidikan</p><h2 id="edu-h" class="h2">' + miring(D.judulSekolah) + '</h2><p class="section-sub">' + esc(D.ketSekolah) + '</p><div class="school-grid">' +
        sekolah.map(function (s) {
          return '<article class="school-card" data-bagian="panel">' +
            '<div class="school-media"><img src="' + esc(s.foto) + '" alt="Foto ' + esc(s.nama) + '" loading="lazy">' +
              '<div class="school-logo-badge"><img src="' + esc(s.logo) + '" alt="Logo ' + esc(s.nama) + '" loading="lazy"></div>' +
            '</div>' +
            '<div class="school-body">' +
              '<span class="school-level">' + esc(s.jenjang) + '</span>' +
              '<h3>' + esc(s.nama) + '</h3>' +
              '<p class="school-major">' + esc(s.jurusan) + ' · <span>' + esc(s.tahun) + '</span></p>' +
              '<p class="school-desc">' + esc(s.catatan) + '</p>' +
              '<div class="school-address">' + ikon('pin') + '<span>' + esc(s.alamat) + '</span></div>' +
              '<a class="btn glass-bubble school-map-btn" href="' + esc(s.mapsUrl) + '" target="_blank" rel="noopener" aria-label="Buka Google Maps ' + esc(s.nama) + '">' + ikon('pin') + 'Buka di Google Maps' + ikon('panah') + '</a>' +
            '</div>' +
          '</article>';
        }).join('') + '</div></div></section>' : '') +

      (skill.length ? '<section class="section tight-top" id="skill" aria-labelledby="skill-h"><div class="wrap"><p class="label">/ Bahasa Pemrograman & Tools</p><h2 id="skill-h" class="h2">' + miring(D.judulSkill) + '</h2><p class="section-sub">' + esc(D.ketSkill) + '</p><div class="skill-grid">' +
        skill.map(function (sk) {
          return '<article class="skill-card" data-bagian="panel">' +
            '<div class="skill-top-row">' +
              (sk.foto ? '<div class="skill-photo"><img src="' + esc(sk.foto) + '" alt="Ikon ' + esc(sk.nama) + '" loading="lazy"></div>' : '') +
              '<span class="skill-cat">' + esc(sk.kategori) + '</span>' +
            '</div>' +
            '<h3>' + esc(sk.nama) + '</h3><p>' + esc(sk.ket) + '</p>' +
          '</article>';
        }).join('') + '</div></div></section>' : '') +

      (angka.length ? '<section class="section" aria-labelledby="num-h"><div class="wrap numbers"><div class="numbers-head"><h2 id="num-h" class="h2 left">' + miring(D.judulAngka) + '</h2><p>' + esc(D.ketAngka) + '</p></div><div class="numbers-list">' +
        angka.map(function (a) { return '<figure class="num"><p class="val">' + esc(a.nilai) + ' <span class="serif">' + esc(a.satuan) + '</span></p><p>' + esc(a.ket) + '</p><figcaption class="src"><i data-bagian="aksen">' + ikon('dokumen') + '</i><span><b>' + esc(a.sumber) + '</b><span>' + esc(a.sumberKet) + '</span></span></figcaption></figure>'; }).join('') +
        '</div></div></section>' : '') +

      (langkah.length ? '<section class="section process tight-top" aria-labelledby="how-h"><div class="wrap"><p class="label">/ Cara saya belajar</p><h2 id="how-h" class="h2">' + miring(D.judulCara) + '</h2><div class="steps">' +
        '<svg class="squiggle s1" viewBox="0 0 140 70" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><circle cx="8" cy="60" r="5"/><path d="M10 55C20 20 60 8 110 10"/><circle cx="118" cy="10" r="5"/></svg>' +
        '<svg class="squiggle s2" viewBox="0 0 140 70" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><circle cx="8" cy="30" r="5"/><path d="M13 30c30 0 40-10 60-14 18-4 22 14 10 18-14 4-8-24 4-20 10 4 16 26 24 40"/><circle cx="114" cy="58" r="5"/></svg>' +
        langkah.map(function (s, i) { return '<article class="step" data-bagian="panel"><div class="step-top"><p class="n">0' + (i + 1) + '</p>' + obj(s.objek, 'float', '120px') + '</div><div><h3>' + esc(s.judul) + '</h3><p>' + esc(s.ket) + '</p></div></article>'; }).join('') +
        '</div></div></section>' : '') +

      '<section class="section tight-top" aria-labelledby="shelf-h"><div class="wrap"><div class="shelf di-utama" data-bagian="utama"><div class="shelf-head"><h2 id="shelf-h">' + esc(polos((D.judulRak || '').replace('{n}', karya.length))) + '</h2><p>' + esc(D.ketRak) + '</p></div><ul class="shelf-grid">' +
        karya.map(function (k) { return '<li style="display:contents"><a class="thing" href="' + urlKarya(k) + '" aria-label="' + esc(k.label + ': ' + polos(k.judul)) + '">' + obj(k.objek, '', '152px').replace('class="obj "', 'class="obj"') + '<span class="thing-label" aria-hidden="true">' + esc(k.label) + '</span></a></li>'; }).join('') +
        '</ul></div></div></section>' +

      '<section class="section roomy-top" id="tentang" aria-labelledby="who-h"><div class="wrap about-grid"><div><figure class="about-photo"><img src="' + esc(D.foto) + '" alt="Foto ' + esc(D.nama) + '" width="512" height="640" loading="lazy"></figure>' +
        '<div class="about-foot"><div class="socials">' + sos.map(function (s) { return '<a class="glass-bubble" href="' + esc(s.url) + '" aria-label="' + esc(s.nama) + '"' + (/^http/.test(s.url) ? ' target="_blank" rel="me noopener"' : '') + '>' + ikon(s.ikon) + '</a>'; }).join('') + '</div><p class="who">' + esc(D.nama) + '<span>' + esc(D.kota) + '</span></p></div></div>' +
        '<div><p class="label left">/ Tentang saya</p><h2 id="who-h" class="h2 left">' + miring(D.judulTentang) + '</h2>' +
        (D.tentang || []).map(function (t, i) { return '<p class="about-text"' + (i ? '' : ' style="margin-top:1.5rem"') + '>' + esc(t) + '</p>'; }).join('') +
        '<ul class="xp">' + (D.pengalaman || []).map(function (x) { return '<li><span class="role">' + esc(x.peran) + '</span><span class="org">' + esc(x.tempat) + '</span><span class="yrs">' + bulan(x) + '</span></li>'; }).join('') + '</ul></div></div></section>';
  }

  // ---------- Detail karya ----------
  var PORSI = { sendiri: ['own', 'Sendiri'], pimpin: ['led', 'Memimpin'], tim: ['team', 'Tim'] };
  function detail() {
    var id = new URLSearchParams(location.search).get('id');
    var i = -1; karya.forEach(function (k, j) { if (k.id === id) i = j; });
    if (i < 0) { if (karya.length) { i = 0; } else { $('#main').innerHTML = '<p class="kosong">Belum ada karya di data.js.</p>'; return; } }
    var k = karya[i], lanjut = karya[(i + 1) % karya.length];
    document.title = polos(k.judul) + ' — ' + NAMA;
    var fakta = [k.klien, k.peran, k.tahun].filter(Boolean);
    var as = k.angkaSamping || [];
    var fig = function (a) { return a ? '<p class="margin-fig"><b>' + esc(a.b) + '</b><span>' + esc(a.t) + '</span></p>' : ''; };
    var blok = [];
    if (k.tantangan) blok.push(['tantangan', 'Tantangannya', '<p class="text">' + esc(k.tantangan) + '</p>', '']);
    if (k.dilakukan) blok.push(['dilakukan', 'Yang saya lakukan', '<p class="text">' + esc(k.dilakukan) + '</p>', '']);
    if ((k.hasil || []).length || (k.statistik || []).length) blok.push(['hasil', 'Hasilnya', '<div class="prose" style="margin-top:.8rem">' + (k.hasil || []).map(function (h) { return '<p>' + esc(h) + '</p>'; }).join('') + '</div>' +
      ((k.statistik || []).length ? '<ul class="stats">' + k.statistik.map(function (s) { return '<li class="stat" data-bagian="panel"><b>' + esc(s.b) + '</b><span>' + esc(s.t) + '</span></li>'; }).join('') + '</ul>' : ''), ' full']);
    if ((k.bagian || []).length) blok.push(['bagian', 'Bagian saya', '<ul class="scope" style="margin-top:1.2rem">' + k.bagian.map(function (b) { var p = PORSI[b.p] || PORSI.tim; return '<li><span>' + esc(b.t) + '</span><span class="portion" data-p="' + p[0] + '">' + p[1] + '</span></li>'; }).join('') + '</ul>', ' full']);
    if (k.pelajaran) blok.push(['pelajaran', 'Yang saya pelajari', '<p class="lesson" data-words>' + esc(k.pelajaran) + '</p>', ' full']);

    var tombolDetail = '';
    if (k.youtubeUrl) {
      tombolDetail = '<div class="rise" style="--d:.21s;margin-top:1.2rem"><a class="btn glass-bubble" href="' + esc(k.youtubeUrl) + '" target="_blank" rel="noopener">' + ikon('youtube') + 'Tonton Sekarang</a></div>';
    } else if (k.linkLive) {
      tombolDetail = '<div class="rise" style="--d:.21s;margin-top:1.2rem"><a class="btn glass-bubble" href="' + esc(k.linkLive) + '" target="_blank" rel="noopener">' + ikon('globe') + esc(k.linkLabel || 'Kunjungi Website') + '</a></div>';
    }

    $('#main').innerHTML =
      '<section class="case-hero"><div class="wrap"><a class="back rise" href="index.html#karya">' + ikon('panah') + '<span>Semua karya</span></a>' +
        '<h1 class="rise" style="--d:.05s" data-bagian="teks">' + miring(k.judul) + '</h1>' +
        '<ul class="case-meta rise" style="--d:.12s" aria-label="Fakta proyek">' + fakta.map(function (f) { return '<li class="pill" data-bagian="panel">' + esc(f) + '</li>'; }).join('') + '</ul>' +
        '<p class="case-summary rise" style="--d:.18s">' + esc(k.ringkas) + '</p>' +
        tombolDetail +
        '<div class="case-cover rise di-utama" style="--d:.24s" data-bagian="utama">' + obj(lanjut && lanjut !== k ? lanjut.objek : '', 'float side', '160px') + sampul(k).replace('loading="lazy"', 'loading="eager"') + obj(k.objek, 'float main', '256px') + '</div>' +
      '</div></section>' +
      '<div class="wrap case-body"><aside class="case-nav" aria-label="Di halaman ini">' + blok.slice(0, 4).map(function (b) { return '<a href="#' + b[0] + '">' + b[1] + '</a>'; }).join('') +
        '<dl><div><dt>Kategori / Sekolah</dt><dd>' + esc(k.klien) + '</dd></div><div><dt>Peran</dt><dd>' + esc(k.peran) + '</dd></div><div><dt>Waktu</dt><dd>' + esc(k.tahun) + '</dd></div></dl></aside>' +
        '<article class="case-article">' + blok.map(function (b, j) { return '<section class="block' + b[3] + '" aria-labelledby="' + b[0] + '"><h2 id="' + b[0] + '">' + b[1] + '</h2>' + b[2] + '</section>' + (j < 2 ? fig(as[j]) : ''); }).join('') + '</article></div>' +
      (lanjut && lanjut !== k ? '<div class="wrap" style="padding-bottom:var(--sp-tight)"><a class="next-case glass-bubble" href="' + urlKarya(lanjut) + '"><small>Karya berikutnya</small><span>' + esc(polos(lanjut.judul)) + ikon('panah') + '</span></a></div>' : '');
  }

  // ---------- Ajakan + Media Sosial + Contact Me + Footer ----------
  function akhir() {
    var sos = D.sosial || [];
    var urlTerimaKasih = new URL('terimakasih.html', location.href).href;

    var barSosmed = sos.map(function (s) {
      var ext = /^http/.test(s.url) ? ' target="_blank" rel="noopener"' : '';
      return '<a class="btn ghost glass-bubble" href="' + esc(s.url) + '"' + ext + ' aria-label="' + esc(s.nama) + '" style="display:inline-flex;align-items:center;gap:.5rem">' +
        ikon(s.ikon) + '<span>' + esc(s.nama) + '</span>' +
      '</a>';
    }).join('');

    $('#akhir').outerHTML =
      '<section class="cta" id="kontak" aria-labelledby="cta-h"><div class="wrap cta-inner">' + obj('img/objek/envelope.webp', 'float o-envelope', '136px') + obj('img/objek/paperplane.webp', 'float o-plane', '168px') +
        '<h2 id="cta-h" data-bagian="teks">' + miring(D.judulAjak) + '</h2><p>' + esc(D.ketAjak) + '</p>' +

        '<div style="margin-top:1.75rem">' +
          '<p class="label" style="margin-bottom:.85rem">/ Media Sosial & Kontak Langsung</p>' +
          '<div class="hero-cta" style="justify-content:center;flex-wrap:wrap;gap:.75rem">' +
            barSosmed +
          '</div>' +
        '</div>' +

        '<div class="contact-box" data-bagian="panel">' +
          '<div class="contact-head">' +
            '<h3>KIRIM PESAN</h3>' +
            '<span class="contact-star" aria-hidden="true">' + ikon('bintang') + '</span>' +
          '</div>' +
          '<p style="margin:0 0 1.25rem;font-size:.9rem;opacity:.85;display:flex;align-items:center;gap:.45rem">' +
            '<span style="display:inline-flex;width:16px;height:16px">' + ikon('email') + '</span>' +
            '<span>Email tujuan: <strong>' + esc(emailTujuan) + '</strong></span>' +
          '</p>' +
          '<form id="formKirimPesan" class="contact-form" action="https://formsubmit.co/' + encodeURIComponent(emailTujuan) + '" method="POST">' +
            '<input type="hidden" name="_subject" value="Pesan Baru dari Website Portofolio">' +
            '<input type="hidden" name="_next" value="' + esc(urlTerimaKasih) + '">' +
            '<input type="hidden" name="_template" value="table">' +
            '<div class="field-group">' +
              '<label for="kp-nama">NAMA KAMU</label>' +
              '<input type="text" id="kp-nama" name="name" placeholder="Masukkan nama kamu" required>' +
            '</div>' +
            '<div class="field-group">' +
              '<label for="kp-email">EMAIL KAMU</label>' +
              '<input type="email" id="kp-email" name="email" placeholder="Masukkan email kamu" required>' +
            '</div>' +
            '<div class="field-group">' +
              '<label for="kp-pesan">PESAN</label>' +
              '<textarea id="kp-pesan" name="message" rows="4" placeholder="Tuliskan pesan, masukan, atau saran kamu..." required></textarea>' +
            '</div>' +
            '<button type="submit" id="kp-btn" class="btn-kirim-pesan" data-bagian="utama">' +
              '<span id="kp-btn-text">KIRIM PESAN</span>' +
              '<span aria-hidden="true">↗</span>' +
            '</button>' +
            '<p class="contact-note" id="kp-status">Pesan Anda akan langsung masuk ke email saya (' + esc(emailTujuan) + ').</p>' +
          '</form>' +
        '</div>' +
      '</div></section>' +
      '<footer class="foot" data-bagian="nav"><div class="wrap"><div class="foot-row"><ul><li><a href="index.html">Beranda</a></li><li><a href="index.html#karya">Karya</a></li><li><a href="index.html#pendidikan">Pendidikan</a></li><li><a href="index.html#skill">Skill</a></li><li><a href="index.html#tentang">Tentang</a></li>' +
        '<li><a href="mailto:' + esc(emailTujuan) + '">' + esc(emailTujuan) + '</a></li>' +
        sos.filter(function (s) { return /^http/.test(s.url); }).map(function (s) { return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.nama) + '</a></li>'; }).join('') +
        '</ul><small>© ' + new Date().getFullYear() + ' <span data-tema-nama>' + esc(NAMA) + '</span></small></div>' +
        '<p class="kredit">Template oleh <a href="https://malikisaputra.biz.id" target="_blank" rel="noopener">@malikisaputra</a> · Maliki Saputra</p></div>' +
        '<p class="giant" aria-hidden="true">' + esc(D.namaRaksasa || '') + '</p></footer>';

    var form = $('#formKirimPesan');
    if (form) {
      form.addEventListener('submit', function () {
        var btnText = $('#kp-btn-text');
        var st = $('#kp-status');
        if (btnText) btnText.textContent = 'MENGIRIM...';
        if (st) st.textContent = 'Sedang meneruskan pesan Anda ke ' + emailTujuan + '...';
      });
    }
  }

  // ---------- Interactive Liquid Glass Bubble ----------
  function pasangGlassBubble() {
    var selector = '.btn, .nav a, .mode-btn, .pill, .chip, .socials a, .back, .next-case, .case-nav a, .tag';
    function updateBubble(el, clientX, clientY) {
      var r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var x = clientX - r.left;
      var y = clientY - r.top;
      var px = (x / r.width) * 100;
      var py = (y / r.height) * 100;
      var dx = (x / r.width - 0.5) * 10;
      var dy = (y / r.height - 0.5) * 8;
      el.style.setProperty('--bx', px.toFixed(1) + '%');
      el.style.setProperty('--by', py.toFixed(1) + '%');
      el.style.setProperty('--tx', dx.toFixed(2) + 'px');
      el.style.setProperty('--ty', dy.toFixed(2) + 'px');
      el.classList.add('bubble-active');
    }
    function resetBubble(el) {
      el.classList.remove('bubble-active');
      el.style.setProperty('--tx', '0px');
      el.style.setProperty('--ty', '0px');
    }
    document.addEventListener('pointermove', function (e) {
      var el = e.target && e.target.closest ? e.target.closest(selector) : null;
      if (el) updateBubble(el, e.clientX, e.clientY);
    }, { passive: true });
    document.addEventListener('pointerout', function (e) {
      var el = e.target && e.target.closest ? e.target.closest(selector) : null;
      if (el && (!e.relatedTarget || !el.contains(e.relatedTarget))) {
        resetBubble(el);
      }
    }, { passive: true });

    // Sliding bubble indicator inside floating navbar (.nav)
    var nav = $('.nav');
    if (nav) {
      var navBubble = document.createElement('span');
      navBubble.className = 'nav-sliding-bubble';
      navBubble.setAttribute('aria-hidden', 'true');
      nav.insertBefore(navBubble, nav.firstChild);

      function moveNavBubble(target) {
        if (!target) {
          navBubble.style.opacity = '0';
          return;
        }
        var nr = nav.getBoundingClientRect();
        var tr = target.getBoundingClientRect();
        navBubble.style.width = tr.width + 'px';
        navBubble.style.height = tr.height + 'px';
        navBubble.style.transform = 'translate(' + (tr.left - nr.left) + 'px, ' + (tr.top - nr.top) + 'px)';
        navBubble.style.opacity = '1';
      }

      nav.addEventListener('pointermove', function (e) {
        var item = e.target.closest('a, button');
        if (item && nav.contains(item)) {
          moveNavBubble(item);
        }
      }, { passive: true });

      nav.addEventListener('pointerleave', function () {
        navBubble.style.opacity = '0';
      }, { passive: true });
    }
  }

  // ---------- Gerak ----------
  function gerak() {
    var mo = html.classList.contains('mo');
    var antre = '.shelf-head,.shelf-grid .thing,.statement-grid .chip,.steps .step,.numbers-head,.numbers-list .num,.works .work-card-wrap,.school-card,.skill-card,.about-grid > *,.xp li,.case-body .block,.case-nav,.stats .stat,.scope li,.next-case'.split(',');
    var judul = ['main .h2', '.cta h2', '.num .val', '.margin-fig b', '.lesson', '.hallo', '.label:not(.rise)'];
    var benda = ['.section .obj.float', '.cta .obj.float'];
    if (mo) {
      var nk = 0;
      $$('.hero h1 .rise').forEach(function (sp) {
        var ws = sp.textContent.split(/(\s+)/); sp.textContent = '';
        ws.forEach(function (w) { if (!w) return; if (/^\s+$/.test(w)) { sp.append(w); return; } var k = document.createElement('span'); k.className = 'kt'; k.textContent = w; k.style.setProperty('--kd', (nk++ * .07).toFixed(2) + 's'); sp.append(k); });
      });
      var io = new IntersectionObserver(function (es) {
        es.filter(function (e) { return e.isIntersecting; }).map(function (e) { return e.target; })
          .sort(function (a, b) { var r = a.getBoundingClientRect(), s = b.getBoundingClientRect(); return r.top - s.top || r.left - s.left; })
          .forEach(function (t, n) { t.style.setProperty('--rv-d', Math.min(n, 8) * .06 + 's'); t.classList.add('in'); io.unobserve(t); });
      }, { rootMargin: '0px 0px -10% 0px', threshold: .08 });
      $$('.rise').forEach(function (t) { io.observe(t); });
      $$(antre.concat(benda).join(',')).forEach(function (t) { io.observe(t); });
      var grup = new Map();
      $$(judul.join(',')).forEach(function (e) { var p = e.parentElement || e; grup.set(p, (grup.get(p) || []).concat(e)); });
      var io2 = new IntersectionObserver(function (es) {
        es.forEach(function (r) { if (!r.isIntersecting) return; (grup.get(r.target) || []).forEach(function (e, n) { e.style.setProperty('--rv-d', n * .08 + 's'); e.classList.add('in'); }); io2.unobserve(r.target); });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });
      grup.forEach(function (_, p) { io2.observe(p); });
    }
    var kata = $$('[data-words]').map(function (el) {
      var tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [];
      while (tw.nextNode()) nodes.push(tw.currentNode);
      nodes.forEach(function (n) {
        var f = document.createDocumentFragment();
        (n.textContent || '').split(/(\s+)/).forEach(function (w) { if (!w) return; if (/^\s+$/.test(w)) f.append(w); else { var s = document.createElement('span'); s.className = 'w'; s.textContent = w; f.append(s); } });
        n.replaceWith(f);
      });
      el.classList.add('words'); return { el: el, w: $$('.w', el), lit: -1 };
    });
    var top = $('.top'), y0 = scrollY, tunggu = false;
    function gulir() {
      if (tunggu) return; tunggu = true;
      requestAnimationFrame(function () {
        tunggu = false; var h = innerHeight;
        kata.forEach(function (k) {
          var r = k.el.getBoundingClientRect(), p = Math.min(1, Math.max(0, (h * .85 - r.top) / (r.height + h * .4))), n = REDUKSI ? k.w.length : Math.round(p * k.w.length);
          if (n !== k.lit) { k.w.forEach(function (e, i) { e.classList.toggle('on', i < n); }); k.lit = n; }
        });
        if (top) { var y = scrollY, lewat = y > 160; top.classList.toggle('pinned', lewat); top.classList.toggle('away', lewat && y > y0 + 2 && !top.contains(document.activeElement)); if (y < y0 - 2 || !lewat) top.classList.remove('away'); y0 = y; }
      });
    }
    addEventListener('scroll', gulir, { passive: true }); addEventListener('resize', gulir, { passive: true }); gulir();
    if (!REDUKSI && matchMedia('(hover: hover) and (pointer: fine)').matches) {
      $$('.hero, .case-hero').forEach(function (z) {
        var os = $$('.obj', z).map(function (e, i) { return { el: e, k: (i % 2 ? -1 : 1) * (10 + i % 3 * 6) }; });
        if (!os.length) return;
        var tx = 0, ty = 0, x = 0, y = 0, raf = 0;
        function langkah() { x += (tx - x) * .08; y += (ty - y) * .08; os.forEach(function (o) { o.el.style.translate = (x * o.k).toFixed(2) + 'px ' + (y * o.k).toFixed(2) + 'px'; }); raf = Math.abs(tx - x) + Math.abs(ty - y) > .001 ? requestAnimationFrame(langkah) : 0; }
        z.addEventListener('pointermove', function (e) { var r = z.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width - .5; ty = (e.clientY - r.top) / r.height - .5; raf = raf || requestAnimationFrame(langkah); });
        z.addEventListener('pointerleave', function () { tx = 0; ty = 0; raf = raf || requestAnimationFrame(langkah); });
      });
    }
    html.classList.add('mo-ready');
  }

  // ---------- Mode terang/gelap ----------
  function pasangMode() {
    var b = $('#gantiMode'); if (!b) return;
    b.addEventListener('click', function () {
      var m = html.getAttribute('data-mode') === 'gelap' ? 'terang' : 'gelap';
      html.setAttribute('data-mode', m); try { localStorage.setItem('portofolio.mode', m); } catch (e) {}
    });
  }

  // ---------- Tema ----------
  var FONT_OK = ['Plus Jakarta Sans', 'Inter', 'Poppins', 'DM Sans', 'Space Grotesk', 'Nunito'];
  function terapkanTema(t) {
    var st = html.style;
    if (t.utama) st.setProperty('--tema-utama', t.utama);
    if (t.aksen) st.setProperty('--tema-aksen', t.aksen);
    if (t.radius != null) st.setProperty('--tema-radius', typeof t.radius === 'number' ? t.radius + 'px' : t.radius);
    if (t.font) {
      var f = String(t.font).split(',')[0].replace(/["']/g, '').trim();
      st.setProperty('--tema-font', '"' + f + '", system-ui, sans-serif');
      var l = $('#fontTema'); if (l && FONT_OK.indexOf(f) >= 0) l.href = 'https://fonts.googleapis.com/css2?family=' + f.replace(/ /g, '+') + ':wght@300;400;500;600;700&display=swap';
    }
    if (t.mode) html.setAttribute('data-mode', t.mode === 'auto' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'gelap' : 'terang') : t.mode);
    if (t.bagian) terapkanBagian(t.bagian);
    if (t.nama) { NAMA = t.nama; isiNama(); }
    setTimeout(hitungTeksBagian, 0);
  }
  function isiNama() { $$('[data-tema-nama]').forEach(function (e) { e.textContent = NAMA; }); if (!/karya\.html/.test(location.pathname)) document.title = NAMA + ' — ' + polos(D.peran); }
  window.addEventListener('message', function (e) { if (e.data && e.data.tipe === 'tema') terapkanTema(e.data); });

  var NAMA_BAGIAN = { nav: 'Navigasi', latar: 'Latar', panel: 'Panel', utama: 'Warna utama', aksen: 'Aksen', teks: 'Teks' };
  var BAGIAN = ['latar', 'panel', 'nav', 'teks'];
  function warnaNyata(v) {
    var p = document.createElement('i'); p.style.cssText = 'position:absolute;width:0;height:0;background:var(' + v + ')';
    document.body.appendChild(p); var c = getComputedStyle(p).backgroundColor; p.remove();
    var m = (c.match(/[\d.]+/g) || [255, 255, 255]).map(Number);
    if (/^color\(srgb/.test(c)) m = m.map(function (x) { return x * 255; });
    return m.slice(0, 3);
  }
  function terang(v) {
    var l = warnaNyata(v).map(function (c) { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); });
    return (0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2]) > 0.4;
  }
  function hitungTeksBagian() {
    var st = html.style, u = terang('--tema-utama');
    st.setProperty('--tema-nav-teks', terang('--tema-nav') ? '#141712' : '#ffffff');
    st.setProperty('--tema-utama-teks', u ? '#141712' : '#ffffff');
    st.setProperty('--tema-utama-lawan', u ? '#fafbf8' : '#141712');
  }
  function terapkanBagian(bg) {
    var st = html.style;
    BAGIAN.forEach(function (k) { if (bg[k] === undefined) return; if (bg[k]) st.setProperty('--tema-' + k, bg[k]); else st.removeProperty('--tema-' + k); });
  }
  function sorot(b) {
    $$('[data-sorot]').forEach(function (e) { e.removeAttribute('data-sorot'); });
    $$('.label-sorot').forEach(function (e) { e.remove(); });
    if (!b) return;
    $$('[data-bagian="' + b + '"]').forEach(function (e) {
      e.setAttribute('data-sorot', '');
      var r = e.getBoundingClientRect(); if (!r.width || !r.height) return;
      var lb = document.createElement('span'); lb.className = 'label-sorot'; lb.textContent = NAMA_BAGIAN[b] || b;
      lb.style.left = Math.max(2, r.left + 4) + 'px'; lb.style.top = Math.max(2, r.top + 4) + 'px';
      document.body.appendChild(lb);
    });
  }
  var modePilih = false, hoverEl = null;
  function bagianDari(t) { return t && t.closest ? t.closest('[data-bagian]') : null; }
  function setPilih(on) {
    modePilih = !!on; html.classList.toggle('mode-pilih', modePilih);
    if (!modePilih && hoverEl) { hoverEl.removeAttribute('data-pilih-hover'); hoverEl = null; }
  }
  ['click', 'pointerdown', 'mousedown', 'touchstart', 'submit', 'keydown'].forEach(function (tipe) {
    document.addEventListener(tipe, function (e) {
      if (!modePilih) return;
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      if (tipe === 'click') { var el = bagianDari(e.target); if (el) parent.postMessage({ tipe: 'bagian-dipilih', bagian: el.getAttribute('data-bagian') }, '*'); }
    }, { capture: true, passive: false });
  });
  document.addEventListener('mouseover', function (e) {
    if (!modePilih) return; var el = bagianDari(e.target);
    if (hoverEl && hoverEl !== el) hoverEl.removeAttribute('data-pilih-hover');
    hoverEl = el; if (el) el.setAttribute('data-pilih-hover', '');
  }, true);
  window.addEventListener('message', function (e) {
    var d = e.data; if (!d) return;
    if (d.tipe === 'sorot') sorot(d.bagian || null);
    else if (d.tipe === 'mode-pilih') setPilih(d.aktif);
  });
  new MutationObserver(hitungTeksBagian).observe(html, { attributes: true, attributeFilter: ['data-mode'] });

  // ---------- Mulai ----------
  var ikonFav = document.querySelector('link[rel=icon]'); if (ikonFav && D.logo) ikonFav.href = D.logo;
  if ($('#logo') && D.logo) $('#logo').src = D.logo;
  if (D.og) { var og = document.createElement('meta'); og.setAttribute('property', 'og:image'); og.content = D.og; document.head.appendChild(og); }
  if ($('#akhir')) akhir();
  if (/karya\.html/.test(location.pathname)) detail(); else beranda();
  isiNama(); hitungTeksBagian(); pasangMode(); pasangGlassBubble(); gerak();
  if (location.hash && $(location.hash)) $(location.hash).scrollIntoView();
})();