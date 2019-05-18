//Start Block traffic
function blockTraffic(counter){
	this.status = null;
	this.starPositionX = null;
	this.starPositionY = null;
	this.typeClient = undefined;

	this.startSelected = function(event){
		this.startPositionX = event.clientX;
		this.startPositionY = event.clientY;
		this.status = "move";
	};
	this.endSelected = function(event){
		if ((event.clientX !== this.startPositionX || event.clientY !== this.startPositionY) && window.getSelection().toString() !== "" && this.status == "move"){
			if (this.typeClient !== true){
				this.typeClient = this.findData(window.getSelection().toString());
				this.sendMetrikaData(counter, this.typeClient);
			}
		}
		this.status = null;
	};
	this.sendMetrikaData = function(counter, data){
		ym(counter, 'params', {"blocked" : data});
	};
	this.findData = function(str){
		var massReg = [/^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_\.-]+)\.([a-zA-Z\.]{2,6})$/, /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/];
		for(var i = 0; i < massReg.length; i++){
			if(massReg[i].test(str)){
				return massReg[i].test(str);
				break;
			}
		}
		return false;
	};
	this.setEvent = function(){
		document.addEventListener("mousedown", this.startSelected.bind(this));
        document.addEventListener("mouseup", this.endSelected.bind(this));
	};
	this.constructor = function(){
		this.setEvent();
	};

	this.constructor();
	return this; 
}

var BT = new blockTraffic(12345678);
//End block sale slide