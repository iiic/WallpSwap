  WallpSwap
=============

### Změna plochy po zhasnutí obrazovky náhodným výběrem z adresáře ###

Jednoduchý javascript pro Androidí program Tasker. Tento script vytvoří adresář
na kartě telefonu a do tohoto adresáře vložené obrázky se budou náhoně střádat
jako pozadí plochy vašeho zařízení pokaždé po vypnutí obrazovky.
Je to skutečně tak, ke změně plochy nedojde až po zapnutí obrazovky, ale už při
jejím vypnutí, takže vás neruší změna tapety. Při každém zapnutí obrazovky tak
máte jinou tapetu na pozadí vaší plochy (ploch). Tapeta je nastavena tak, aby
byla celá viditelná jak na šířku (landscape), tak na výšku (portrait).
A při procházení více ploch se bude postupně pospouvat, jak jste běžně zvyklí.

Script samotný je oddělen od události, které ho volá, takže pokud byste raději
měli na ploše zástupce, po jehož stisknutí se plocha změní,
není to žádný problém a všechny myslitelné spouštěče scriptu jsou možné.

Script sám nemá žádnou paměť, při každém spuštění znovy vyhledá všechny obrázky
v dané složce a jeden náhodně zvolený z nich nastaví jako tapetu.



Pozor
-----

Program Tasker (pro Android) je nezbytnou součástí tohoto scriptu!
Tasker je placený a můžete si ho koupit v Play
(https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm),
nebo zdarma vyzkoušet (http://tasker.dinglisch.net/download.html).

Teoreticky by šlo vytvořit samostatnou spustitelnou aplikaci pomocí nástroje
Tasker App Factory, prakticky se mi to ale nikdy nepovedlo. Pokud někdo víte
jak na to, budu rád, když mi dáte vědět.



Použití
-------

Tento javascriptový soubor se v programu Tasker načte tak, že tapnete na záložku
`tasks` a tlačítko pro přidání, zlovlíte název a dalším talčítkem `+` zvolíte
kategorii `script` a akci `JavaScript`. Ve vstupním textovém poli Path zvolíte
tento javascript (standardně jde o soubor `wallpswap.js`). Ostatních nastavení
už si nemusíte všímat a vše jen potvrdíte a uložíte.

Tento `Task` již můžete volat z různých profilů, pokud ale chcete změnit pozadí
při zhasnutí obrazovky postupujte dále takto:
Na záložce `Profiles` vytvořte profil libovolného jména a dále zvolte kontext
`State`, poté kategorii `Display` a akci Display State. Pak už stačí jen tapnout
na potvrzovací fajfku (nastavení ls na Off je výchozí nastavení) a je hotovo.
K tomuto profilu pak vyberte task vytvořenou v předchozím kroku.


Javascript
----------

Už nevyžaduje žádné další úpravy, můžete však měnit řadu jeho parametrů.
(na konci .js souboru)

Inicializace aplikace:

	var linkSwap = new WallpSwap('wallpSwap');

parametr je zde jméno složky použité pro obrázky na sd-kartě

následně metoda set může upravit chování scriptu:

	linkQuote.set({proměnná:hodnota, proměnná:hodnota, ...});

nastavení obsahuje následující volby

* `requireRoot`: bool, má aplikace vyžadovat root přístup pro souborové operace?,
* `verbose`: bool, vypisovat flash zprávičky?,
* `includeHidden`: bool, hledat (obrázky) i ve skrytých souborech?

Nakonec se script spustí metodou run:

	linkSwap.run();

### příklad XML souboru projektu vyexportovaného programem Tasker
je v souboru `WallpSwap.prj.xml` ###



Budoucí verze
-------------

Podle plánu se do nových verzí dostanou funkce jako:
* Samostatná spustitelná aplikace (.apk)
* Podpora více formátů obrazků
* Obrazovka s nastavením aplikace
* Cache pro cesky k obrázkům (nebude nutné při každém spuštění znovu prohledávat celou složku)
* Podpora dalších aplikací, které stahují obrázky na sd-kartu



Testováno na zařízeních
-----------------------

### funguje: ###
* TF201 (Android 4.0.3) Tasker verze 1.3.1

(fungovat by mělo i v dalších verzích programu Tasker)



Licence
-------

Celý sctipt je vydán pod licencí Creative Commons verze 3.0 BY
[CC BY] (http://creativecommons.org/licenses/by/3.0/cz/)

Budu rád, když v souladu s licencí zachováte úvodní víceřádkový komentář
v javascript souboru ( `jquery.copywithq.js` )

ic
