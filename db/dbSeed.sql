create table aaAdventureMain (
    id serial primary key,
    title varchar(100),
    cover text,
    patreonTier integer,
    tooltip varchar default 'Early Access'
)

create table aasummary (
    id serial primary key,
    adventureId integer,
    body text
);

insert into aasummary (adventureid, index, body) values 
(1, 0, 'Deutsches Ipsum Dolor deserunt Flughafen has schnell Tollit Schneewittchen ius über Saepe Döner elaboraret Rotwurst ne, Projektplanung eu Angela Merkel pertinax, Currywurst eripuit Danke no Weltschmerz Diam Glühwein no Prost eos Freude schöner Götterfunken suscipit Glühwein Eam Brezel offendit Krankenschwester ad Brezel voluptatibus Ich bin ein Berliner ad Nackenheim consul Grimms Märchen vix. Schwarzwälder Kirschtorte quas Prost veritus HugoClub Mate amet, Ich habe fertig adipiscing Handschuh sed bitte eiusmod Volkswagen incididunt Autobahn labore Mesut Özil dolore Die unendliche Geschichte aliqua. genau enim Riesling minim Die unendliche Geschichte quis Wurst exercitation Wurst laboris Welt ut Mercedes Benz ex Die unendliche Geschichte commodo Hockenheim Duis Anwendungsprogrammierschnittstelle irure Apfelschorle in Frohsinn in Müller Rice velit Herr Doktor cillum Schnaps eu Riesling nulla Hörspiele Excepteur Käsefondue occaecat Mercedes Benz non Prost sunt Jürgen Klinsmann culpa Zeitgeist officia Erbsenzähler mollit Kaftfahrzeug-Haftpflichtversicherung id Kreuzberg laborum'),
(1, 1, 'id Stuttgart indoctum Ritter Sport pri, Aperol Spritz meliore Bretzel nominavi schnell Elitr Heisenberg nam Heisenberg his Grimms Märchen reque Die unendliche Geschichte assentior. schnell principes Guten Tag ex Schmetterling Ut Spezi solum Handschuh quas Eichhörnchen adversarium Herr Doktor ius, Berlin minim Zauberer eum Kartoffelkopf lucilius Ritter Sport at, Schweinsteiger laboramus Zauberer per Herr Doktor in Rotwurst ullum Sprechen Sie deutsch Id Donaudampfschiffahrtsgesellschaftskapitän recteque Krankenschwester sed. Kindergarten nec Bier argumentum, Berlin melius Freude schöner Götterfunken vix. Grimms Märchen ut Kartoffelkopf causae Pfannkuchen prodesset Prost mea Weihnachten Dicunt Ritter Sport suscipit Donaudampfschiffahrtsgesellschaftskapitän no. Müller Rice nemore Honigkuchenpferd eum. Deutsche Mark regione Goethe efficiendi Jürgen Klinsmann'),
(1, 2, 'Deutsches Ipsum Dolor sit Bahnhof consectetur Honigkuchenpferd elit, Brezel do Grimms Märchen tempor Köln ut Lebensabschnittsgefährte et Bratwurst magna HugoClub Mate Ut Wie gehts ad Rotwurst veniam, Aperol Spritz nostrud Hallo ullamco Guten Tag nisi Mercedes Benz aliquip Schneewittchen ea Ohrwurm consequat. Schwarzwälder Kirschtorte aute Heisenberg dolor Lebensabschnittsgefährte reprehenderit Siebentausendzweihundertvierundfünfzig voluptate Honigkuchenpferd esse Mertesacker dolore 99 Luftballons fugiat Hamburg pariatur. Berlin sint Milchreis cupidatat was machst du proident, Schnaps in Schnaps qui Nackenheim deserunt Kaftfahrzeug-Haftpflichtversicherung anim Hamburg est Umsatzanalyse dissentias Projektplanung et. Rubin auf Schienen argumentum Lebensabschnittsgefährte an. Schmetterling lobortis bitte per Angela Merkel nam Mozart probatus Bier impetus Ritter Sport aliquando Riesling sea. bitte scripserit Helmut Kohl vis, Projektplanung meis Aufschnitt ea. Faust ea Zauberer eleifend, Döner blandit über sed, Schwarzwälder Kirschtorte eius Mozart sanctus Landjaeger Cu Flughafen legimus Schmetterling vim');

create table aaSearchTable (
    id serial primary key,
    adventureid INTEGER,
    minLevel INTEGER,
    maxLevel INTEGER,
    pageCount INTEGER,
    timePeriod varchar(20),
    pregens BOOLEAN,
    playerguide BOOLEAN,
    handouts boolean,
    battlemap boolean
)

create table aaEnvirons (
    id serial primary key,
    environ varchar(100)
)

create table aaAdventureEnvirons (
    id serial primary key,
    adventureid INTEGER,
    environid INTEGER
);

create table aaSubsystem (
    id serial primary key,
    subsystem varchar(100)
);

create table aaAdventureSubsystem (
    id serial primary key,
    adventureid INTEGER,
    subsystemid INTEGER
);

create table aaadventureauxinfo (
id serial primary key,
adventureid int,
version varchar(16),
pages int,
levelmin int,
levelmax int,
pregens BOOLEAN,
handouts boolean,
battlemap boolean
);

create table aaadventureseriescode (
    id serial primary key,
    seriescode varchar(10),
    seriestitle text
);

create table aaauthors (
    id serial PRIMARY key,
    name varchar(150)
);

create table aaauthorsadventure (
    id serial PRIMARY key,
    adventureid int,
    authorid int
);

create table aaenvironsadventure (
    id serial primary key,
    adventureid int,
    environid int
);