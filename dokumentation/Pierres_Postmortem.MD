# Postmortem speldesign-furious-fighters
Pierre Lundström, postmortem skriven 2021-01-28

# 1. Inledning 
Jag har utvecklat ett Phaser spel tillsammans med min grupp och använt parcel.

# 1.1 Syfte och mål
Arbetets syfte och mål var att bli bättre på att programmera med Phaser, använda Parcel samt att göra ett fungerande spel.

# 1.2 Arbetssätt och genomförande
Jag började med att planera i gruppen vad spelet ska handla om. Sedan så skapade jag ett projektbräde i Github repot där jag och Filip pratade om vem som skulle göra vad för programmering i spelet. Efter det så började jag skriva kod och fortsatte med nya funktioner allt eftersom. I början så använde jag Webpack, men bytte sedan till Parcel för att det skulle bli lättare att dela upp filer med mera.

# 1.3 Bakgrund
Jag har använt en dator med Visual Studio Code för att skriva koden i. Jag har använt spelmotorn Phaser3 och byggverktyget Parcel samt Github pages. Jag har även använt Discord för att skriva till estetarna. 
<br>
Mitt planeringsarbete var ganska bra, men kunde varit mycket bättre. Jag var närvarande vid första tillfället då vi pratade med estetarna i ett klassrum. Jag kollade i dokumentet som estetarna hade skrivit för att veta mer om vad spelet ska innehålla, men jag skrev inte dit mycket själv. Jag använde ett Github projektbräde för att dela upp programmeringsdelarna i spelet. 
<br>
Jag tycker överlag att jag fått med huvuddragen i spelet, även om allt inte är färdigt exempelvis stridssystemet och animationen av pepparkakan. 
<br>
Så här står det i planeringen skriven av estetarna under "Huvuddrag(key features)" rubriken:
"(Julspelet) är ett våldsamt fighterspel där man ska slåss mot nissar för att segra". Och detta stämmer ganska bra mot spelet jag programmerat, förutom att man inte kan slåss tillbaka mot nissar ännu, och det var för att jag inte hann färdigt med den funktionen.

<br>
Projektet har innehållit några olika delar, exempelvis grafik, rörelse, levels, pepparkakor, fiender som spawnas med mera. 

<br>
Jag har själv testat spelet i webbläsaren under programmeringstiden och debuggat errors och fixat olika errors flera gånger under tidens gång. Jag har till exempel använt inspekteraren i webbläsaren för att kolla stacktracen för error. Ett exempel på ett error som jag stötte på var när jag byggde till Github pages med flera klasser. Då fick jag ett error i webbläsarkonsolen med ingen bra stacktrace. Men jag förstod att det hade o göra med att det var flera filer som main filen inte känner igen eftersom det fungerade innan jag delade upp det i flera filer. Jag fixade detta genom att länka till filerna i main.js och sedan byggde om till Github pages och sedan gick spelet att spela på Github pages.

Jag fick även speltest feedback av andra klasser när spelet var halvklart och efter det så har jag hunnit lagt till det mesta av den feedbacken exempelvis så att man inte hoppar lika högt, bakgrund grafik, fler levlar och fiender men hann inte färdigt med till exempel timern. Jag valde att fixa de som kändes som viktigast först eller de som flest personer nämnt i speltestens feedback.
<br>
De funktioner jag gjorde i detta spel var till exempel följande:
<br>
1. Fler pepparkakor spawnas när de är slut och då även på marken & höjd med bounces.
2. Nissar som spawnas från början och ju högre level man kommer desto fler nissar spawnas. Nissarna attackerar spelaren om spelaren är nära nissarna. 
3. HP systemet och så att man får hp av att plocka upp pepparkakor, detta utifrån kommentar från speltest av andra klasser.
4. Meny scenen med info.
5. Ändrat och lagt till massa spelsaker i play scenen.
6. Nytt Levels systemet
7. Nytt Fiender systemet
8. Lagt till och ändrat rörelse systemet 
9. Lagt till en bakgrund i spelet.
10. Score systemet så att man får score för varje pepparkaka man tar upp och vid vissa scores så ökar man till nästa level.
Sen så har jag också lagt till parcel och phaser samt byggt till github pages och ändrat byggvariabler mm.
<br>
Det jag inte hann var till exempel:
Färdigställa slåss funktionen i stridssystemet, tidsräknare och sprida ut fienderna mera.
<br>
Det Filip har gjort:
1. Ändrat gold coin till pepparkaka
2. Ändrat player sprite till tomte.
<br>
Det Filip inte hann med var att ge pepparkakan animation.

# 1.4 Positiva erfarenheter
Jag tycker spelprojektet har gått bra eftersom att spelet är spelbart, men inte jättebra eftersom spelet inte är jätteroligt att spela. Slutprodukten samt arbetsprocessen hade kunnat vara bättre. Jag kunde ha hjälpt Filip mer med att få in tomten eller pepparkakan från början även om han inte frågade om hjälp just då. Jag hade kunnat fråga om han ville ha hjälp med något redan från början. Men i 
slutet hjälpte jag honom med ett bugg i visual studio code som han hade då vilket försvann när han startade om hans dator. Att jobba i grupp med Filip tyckte jag gick bra och att vi samarbetade bra och att det gick bra att dela upp arbetet. Det gick även bra att kommunicera med estetarna och de levererade grafiken i tid tycker jag.

# 1.5 Negativa erfarenheter
Jag hade inga negativa erfarenheter, men det var inte jättelätt att hitta bra information från Phaser dokumentationen, så jag testade mig fram och använde min Javascript kunskap för att till exempel få till så att pepparkakor spawnas igen när slut samt att få enemies att spawna.

# 1.6 Sammanfattning
Jag har lärt mig att jobba med Parcel och Phaser eftersom jag aldrig jobbat med just det tidigare. Slutprodukten av spelet hade kunnat vara bättre om jag och min grupp hann färdigt med resten av funktionerna som vi hade tänkt lägga till, men spelet har också en del bra grundfunktioner tycker jag. Av det som vi planerade att ha i spelet så hann jag och min grupp med det mesta av funktionerna. Utvecklingsmöjligheter är exempelvis att färdigställa stridssystemet helt, färdigställa tidsräknaren, färdigställa animation av tomte och lägga till fler funktioner. Det finns absolut möjlighet att göra spelet bättre och om jag skulle lägga mer tid på spelet så hade jag förbättrat spelet.