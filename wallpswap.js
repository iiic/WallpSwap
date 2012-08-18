/**
 * wallpSwap
 *
 * Swap wallpaper by random when display state off
 * No other dependencies
 * Q3 2012
 *
 * @copyleft   ic (icweb.eu)
 * @license    CC BY (http://creativecommons.org/licenses/by/3.0/)
 * @link       https://github.com/iiic/wallpswap
 * @version    0.1
 *
 * Fork me on github @iiic
 */
var WallpSwap = function(folder) {
	this.folder = folder; // nepoužívat žádné speciální znaky, které by se musely escapovat v regulárním výrazu!
};

WallpSwap.prototype = {

	settings: // default values
	{
		'requireRoot': false,
		'verbose': true,
		'includeHidden': false
	},

	set: function(variables)
	{
		for(i in variables) {
			this.settings[i] = variables[i];
		}
		return true;
	},

	toast: function(message, verbose)
	{
		if(verbose === undefined) {
			verbose = this.settings['verbose'];
		}
		if(verbose) {
			flashLong(message); // flashLong( str message )
			// @todo : udělat flash pro kratší zprávičky... třeba podle délky řetězce
		}
		return true;
	},

	/** @READ_EXTERNAL_STORAGE */
	scanCard: function(dirPath, includeHidden)
	{
		if(includeHidden === undefined) {
			includeHidden = this.settings['includeHidden'];
		}
		response = listFiles(dirPath, includeHidden); // str files = listFiles( str dirPath, bool hiddenToo )
		if( (response === undefined) || (response == '') ) {
			return false;
		} else {
			return response;
		}
	},

	/** @WRITE_EXTERNAL_STORAGE */
	createFolder: function(dirPath, requireRoot)
	{
		if(requireRoot === undefined) {
			requireRoot = this.settings['requireRoot'];
		}
		return createDir(dirPath, false, requireRoot); // var ok = createDir( str dirPath, bool createParent, bool useRoot )
	},

	find: function(regular, where)
	{
		var regular = new RegExp(regular);
		var result = where.search(regular);
		if(result == -1) {
			return false;
		} else {
			return true;
		}
	},

	/** @SET_WALLPAPER */
	setWallp: function(file)
	{
		return setWallpaper(file); // var ok = setWallpaper( str path )
	},

	run: function()
	{
		var onCard = this.scanCard('/sdcard');
		if(onCard) {
			// @todo : vyhledat adresáře PicSpeed Wallpapers a Wallpapers Bay for Tablet, které stahují obrázky na plochu a pokud existují, tak je použít a napsat o tom uživateli toast message
			if(this.find('/sdcard/'+this.folder, onCard)) {
				var pictures = this.scanCard(this.folder);
				if(pictures) {
					var arr = pictures.split('\n');
					for(i in arr) {
						if(!this.find('^.+\.jpe?g$', arr[i])) { // @todo : přidat i další formáty obrázků
							arr.splice(i,i+1);
						}
					}
				}
				if( (arr === undefined) || (arr.length == 0) ) {
					this.toast('kde jsou obrázky? nic jsem nenešel');
					return false;
				} else {
					this.toast('budu náhodně střídat '+arr.length+' obrázků'); // tohle se nevypíše, pokud se mění obrázek... divné
				}
				if(!this.setWallp(arr[Math.floor(Math.random()*arr.length)])) {
					this.toast('Chyba: Wallpaper se nepodařilo nastavit.');
					return false;
				}
			} else {
				if(this.createFolder(this.folder)) {
					this.toast('na kartě byl vytvořen adresář '+this.folder+'\n do něj ukládejte obrázky, které chcete střídat na ploše');
				} else {
					this.toast('Chyba: Adresář '+this.folder+' se nepodařilo vytvořit');
					return false;
				}
			}
		} else {
			this.toast('Nebyla nalezena paměťová karta,\nprogram nemůže dále pokračovat.\nJe mi líto');
			return false;
		}
		return true;
	}
};



var linkSwap = new WallpSwap('wallpSwap');
linkSwap.run();
