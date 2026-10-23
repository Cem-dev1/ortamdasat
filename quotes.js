const bilgiDeposu = [
  // COĞRAFYA & DOĞA
  "Ağrı Dağı aslında Türkiye'nin değil, tüm Avrupa continent'inin (Avrasya) en yüksek volkanik konisidir.",
  "Konya yüzölçümü olarak Hollanda'dan daha büyüktür. Hollanda 41.543 km², Konya ise 40.838 km².",
  "Dünyadaki fındık üretiminin yaklaşık %70'i Türkiye'dedir. Nutella'nın sahibi Ferrero, dünyadaki fındık krizlerini önlemek için Türkiye'deki rekolteyi takip eder.",
  "Türkiye'de aktif olabilecek 14 tane volkanik dağ vardır. En son patlayan ise 1855'te Tendürek Dağı'dır.",
  "Türkiye, üç tarafı denizlerle çevrili olmasına rağmen deniz seviyesinden ortalama yüksekliği 1141 metredir. Avrupa'nın ortalama yüksekliği ise sadece 330 metredir.",
  "Van Gölü sadece Türkiye'nin en büyük gölü değil, dünyadaki en büyük sodalı göldür.",
  "Rize'nin Çamlıhemşin ilçesindeki Palovit Şelalesi ve çevresi, dünyada koruma altına alınmış 200 ekolojik bölgeden biridir.",

  // ŞEHİRLER & TUHAF GERÇEKLER
  "Iğdır, Doğu Anadolu Bölgesi'nde olmasına rağmen mikroklima iklimi sayesinde pamuk yetiştirilebilen tek Doğu şehridir.",
  "Hakkari'deki Cilo Dağları'nda binlerce yıllık erimemiş buzul kütleleri bulunur. Türkiye'de buzul olduğuna çoğu kişi inanmaz.",
  "Mardin Eski Şehir merkezinde dar ve merdivenli sokaklardan dolayı çöpler hâlâ belediye kadrosundaki kadrolu eşeklerle toplanır.",
  "Çanakkale ve İstanbul Boğazları olmasaydı Karadeniz bir deniz değil, devasa bir tatlı su gölü olacaktı.",
  "Zonguldak'taki Gökgöl Mağarası'nın içindeki havanın nem oranı %90'ın üzerindedir ve mikropsuz olduğu için astım hastalarına iyi geldiği kanıtlanmıştır.",

  // TARİH & İLKLER (TÜRKİYE BÖLGESİ)
  "Dünyanın bilinen ilk tapınağı Göbeklitepe (Şanlıurfa), Piramitler'den 7.500 yıl, Stonehenge'den ise 7.000 yıl daha eskidir.",
  "Dünyada ilk parayı icat eden Lidyalılar, Manisa (Sardes) yakınlarında yaşamıştır.",
  "Noel Baba olarak bilinen St. Nicholas, Kuzey Kutbu'nda değil, Antalya'nın Demre ilçesinde doğup yaşamıştır.",
  "Hristiyanlığın 'ilk kilisesi' kabul edilen St. Pierre Kilisesi Antakya'dadır (Hatay). Hristiyan ismi ilk kez burada kullanılmıştır.",
  "Dünyanın en eski peynir kalıntıları ve ilk yerleşik şehir düzeni Konya Çatalhöyük'te bulunmuştur (yaklaşık M.Ö. 7400).",
  "Dünyanın bilinen ilk barış antlaşması olan Kadeş Antlaşması'nın tabletleri Çorum'daki Hattuşaş (Hitit Başkenti) kazılarında bulunmuştur.",

  // CANLILAR & BİYOÇEŞİTLİLİK
  "Anadolu Parsı (Anadolu Kaplanı) nesli tükendi sanılıyordu ancak son yıllarda Doğu ve Güneydoğu Anadolu'da fotokapanlara yakalandı.",
  "Sadece Van Gölü'nde yaşayabilen İnci Kefali, üremek için tatlı sulara akıntıya karşı zıplayarak yüzer (Somon balığı gibi).",
  "Tüm Avrupa kıtasında toplam 12.000 bitki türü varken, sadece Türkiye'de tek başına 11.000'den fazla bitki türü vardır ve bunların 3.000'den fazlası endemiktir (sadece Türkiye'de yetişir).",
  "Ankara Kedisi ve Van Kedisi genetik mutasyon farkından dolayı dünyada tek gözü mavi tek gözü kehribar olan ender kedi ırklarındandır.",
  // --- LISTELIST LİSTESİNDEN SEÇMELER & KLASİKLER ---
  "Otomat makineleri, insan öldürme istatistiğinde köpekbalıklarını tam 4 kat geride bırakıyor.",
  "TI-83 grafik hesap makinesinin işlem gücü, Apollo 11'i Ay'a indiren uzay aracının bilgisayarından 6 kat daha güçlüdür.",
  "Solaklar için tasarlanmamış sağ el ekipmanları yüzünden her yıl 2.500'den fazla solak insan hayatını kaybediyor.",
  "Google'ın kurucuları 1999 yılında şirketi Excite'a 1 milyon dolara satmak istedi ama Excite 'Pahalı' deyip reddetti.",
  "Marlboro reklamlarında oynayan ikonik 'Marlboro Adam' aktörlerinin çoğu akciğer kanserinden öldü.",
  "Rusya'da 2011 yılına kadar alkol oranı %10'un altında olan tüm içecekler (bira dahil) 'meşrubat/gazoz' sayılıyordu.",
  "Bugüne kadar yaşamış tüm insanların yaklaşık yarısının ölüm sebebi sıtmadır (sivrisinekler).",
  "Madam Curie'nin 100 yıl önceki çalışma defterleri hâlâ o kadar radyoaktif ki incelemek isteyenler ölüm sorumluluk feragatnamesi imzalıyor.",
  "Uçakta yemeklerin tatsız gelmesinin sebebi yemekler değil; 10 bin metrede tat ve koku duyumuzun %30-%50 oranında düşmesidir.",
  "Sinek kuşlarının kalbi dakikada tam 1.200 kez atar.",
  "İnsan vücudundaki tüm atomların sayısı (7 oktilyon), gözle gözlemlenebilir evrendeki toplam yıldız sayısından fazladır.",
  "1518 yılında Fransa/Almanya sınırında 'Dans Vebası' salgını çıktı; insanlar yemeden içmeden bitap düşüp ölene kadar haftalarca dans etti.",

  // --- TÜRKİYE & COĞRAFYA BOMBALARI ---
  "Konya tek başına 40.838 km² yüzölçümüyle koskoca Hollanda ülkesinden (41.543 km²) neredeyse daha büyüktür.",
  "Mardin'in dar ve merdivenli tarihi sokaklarında çöpleri toplamak için belediye kadrosunda resmi 'cadde temizlik kadrolu eşekleri' çalışır.",
  "Türkiye'de aktif olma ihtimali bulunan 14 volkanik dağ vardır. En son patlayan ise 1855 yılında Tendürek Dağı'dır.",
  "Dünyadaki fındık üretiminin %70'i Türkiye'dedir. Nutella'nın üreticisi Ferrero, sırf fındık krizine girmemek için Karadeniz'deki hava durumunu canlı takip eder.",
  "Hakkari'deki Cilo Dağları'nda binlerce yıllık hiç erimemiş buzul kütleleri bulunur. Türkiye'de buzul olduğuna çoğu kimse inanmaz.",
  "Üç tarafı denizlerle çevrili olmasına rağmen Türkiye'nin ortalama yüksekliği 1141 metredir. Bütün Avrupa'nın ortalama yüksekliği ise sadece 330 metredir.",
  "Iğdır, Doğu Anadolu'da olmasına rağmen etrafı dağlarla çevrili bir mikro-klima alanı olduğu için pamuk yetişen tek Doğu şehridir.",

  // --- BİLİM, GENETİK & BİYOLOJİ ---
  "Ahtapotların 3 tane kalbi vardır ve kanlarının rengi bakır bazlı olduğu için masmavidir.",
  "Mavi gözlü insanların tamamı yaklaşık 6.000 - 10.000 yıl önce Karadeniz bölgesinde yaşamış TEK BİR ortak atanın genetik mutasyonundan gelir.",
  "Muz teknik olarak radyoaktif bir meyvedir çünkü bünyesinde yüksek oranda Potasyum-40 izotopu barındırır.",
  "Somon balıklarının eti aslında gri renklidir. Yedikleri karides ve karotenoid pigmentleri yüzünden bildiğimiz turuncu/pembe renge bürünürler.",
  "Çilek botanik olarak bir 'meyve' değildir ama domates, patlıcan, muz ve karpuz bilimsel olarak birer meyvedir (berry).",
  "Su aygırlarının (hipopotam) sütü çilekli süt gibi pembe renktedir.",
  "Uzayda astronotların omurgası yerçekimi baskısı kalktığı için esner ve boyları 5 cm'ye kadar uzayabilir.",
  "Güneş'in merkezinde üretilen bir fotonun (ışık taneciğinin) yüzeye ulaşması 200.000 yıl sürer. Yüzeyden çıkıp gözümüze gelmesi ise sadece 8 dakikadır.",

  // --- TARİH & POPÜLER KÜLTÜR ---
  "Göbeklitepe (Şanlıurfa), Mısır Piramitleri'nden 7.500 yıl, İngiltere'deki Stonehenge'den ise 7.000 yıl daha eskidir.",
  "Dünyada parayı ilk kez icat eden Lidyalılar, Manisa'nın Salihli ilçesindeki Sardes kentinde yaşamıştır.",
  "Noel Baba (St. Nicholas) Kuzey Kutbu'nda değil, Antalya'nın Demre ilçesinde doğmuş ve orada yaşamıştır.",
  "Oxford Üniversitesi, Aztek İmparatorluğu'ndan daha eskidir. Oxford 1096'da eğitime başladı, Aztekler ise 1325'te kuruldu.",
  "Nintendo şirketi San Francisco depreminden, Süveyş Kanalı'nın açılışından veya Osmanlı'nın yıkılışından önce; 1889 yılında iskambil kartı üreticisi olarak kurulmuştur.",
  "Japonya'da yetişkin bezi satışları, bebek bezi satışlarını geride bırakmıştır."
];
