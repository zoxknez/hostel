(async () => {
const fs = await import('node:fs');
const path = await import('node:path');

const messagesDir = path.join(__dirname, 'messages');
const langs = ['en', 'sr', 'ru', 'de'];

langs.forEach(lang => {
  const file = path.join(messagesDir, `${lang}.json`);
  let data = JSON.parse(fs.readFileSync(file, 'utf8'));

  if (lang === 'en') {
    data.About.locationDesc = "We are located in the center of the city, around a <highlight>10-minute walk from Kalemegdan</highlight>, close to the River Sava, Branko's Bridge, and many more attractions.";
  } else if (lang === 'sr') {
    data.About.locationDesc = "Nalazimo se u strogom centru grada, na oko <highlight>10 minuta hoda od Kalemegdana</highlight>, blizu reke Save, Brankovog mosta i mnogih drugih atrakcija.";
  } else if (lang === 'ru') {
    data.About.locationDesc = "Мы находимся в самом центре города, примерно в <highlight>10 минутах ходьбы от Калемегдана</highlight>, рядом с рекой Савой, Бранковым мостом и другими достопримечательностями.";
  } else if (lang === 'de') {
    data.About.locationDesc = "Wir befinden uns mitten im Stadtzentrum, etwa <highlight>10 Gehminuten von Kalemegdan entfernt</highlight>, in der Nähe des Flusses Save, der Brankov-Brücke und vieler weiterer Sehenswürdigkeiten.";
  }

  // Also fix Hero.description to use rich tags if it has any, but Hero doesn't use HTML tags currently explicitly inside translate calls.

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log("Fixed highlight in " + lang + ".json");
});
})();
