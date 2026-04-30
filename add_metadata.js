(async () => {
const fs = await import('node:fs');
const path = await import('node:path');

const messagesDir = path.join(__dirname, 'messages');
const langs = ['en', 'sr', 'ru', 'de'];

langs.forEach(lang => {
  const file = path.join(messagesDir, `${lang}.json`);
  let data = JSON.parse(fs.readFileSync(file, 'utf8'));

  if (lang === 'en') {
    data.Metadata = {
      title: "Hostel Downtown Inn - Belgrade",
      description: "Modern hostel in the heart of Belgrade with stunning views, comfortable rooms, and unbeatable location. Book your stay today!"
    };
  } else if (lang === 'sr') {
    data.Metadata = {
      title: "Hostel Downtown Inn - Beograd",
      description: "Moderan hostel u srcu Beograda sa prelepim pogledom, udobnim sobama i najboljom lokacijom. Rezervišite vaš boravak danas!"
    };
  } else if (lang === 'ru') {
    data.Metadata = {
      title: "Hostel Downtown Inn - Белград",
      description: "Современный хостел в центре Белграда с потрясающим видом, уютными номерами и прекрасным расположением. Забронируйте сейчас!"
    };
  } else if (lang === 'de') {
    data.Metadata = {
      title: "Hostel Downtown Inn - Belgrad",
      description: "Modernes Hostel im Herzen von Belgrad mit atemberaubender Aussicht, komfortablen Zimmern und unschlagbarer Lage. Buchen Sie noch heute!"
    };
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`Added Metadata to ${lang}.json`);
});
})();
