<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Liva SIMRS - Sistem Informasi Manajemen Rumah Sakit Terintegrasi</title>
    <meta name="description" content="Platform SIMRS Cloud Generasi Baru terintegrasi penuh SATUSEHAT Kemenkes RI, BPJS Kesehatan Bridging VClaim 2.0, RME Paripurna, LIS/RIS, Farmasi, dan Billing Otomatis.">
    <link rel="icon" type="image/png" href="https://lh3.googleusercontent.com/aida/AEtjO1XAHIn1996QD1vNDMJOI8vdcD23fhuJ9R1JA7IQBDBpCleoEmx9kMbyYdRUDT0uLi7_REF8zQVaH0To8_w471zcowmSdXjp2znm9RnHL5dtzXY8dA103emK9CmIDNTLY41jkXa8FVs-gZ80YgXohNYtPSkgXFfEBGxyU4w0aGxkITySYI_yEPJOhgmzNIOLyTBXTg1IMhQsGD2dUtkAOrYDyjtEFtFHLVJZjFyOSJIPWo5i2pitZyCQXaIH">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Google Material Symbols Outlined -->
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-surface font-body text-on-surface antialiased selection:bg-primary selection:text-white min-h-screen">
    <div id="root"></div>
</body>
</html>
