function resultParse(data){
	var varlist = new Array();
	var dlist = new Array();
	var strtemp = new String();
	var strtype = new String();

	var result = new Object();

	for(var i=0; i < data.head.vars.length; i++){
		varlist.push(data.head.vars[i]);
	}

	for(var i=0; i < data.results.bindings.length; i++){
		var addlist = new Array();
		var addobj = new Object();
		var obj = data.results.bindings[i];
		for(var j=0; j < varlist.length; j++){
			if((obj[varlist[j]]) != undefined){
				strtemp = obj[varlist[j]].value;
				strtype = obj[varlist[j]].type;
				strlang = obj[varlist[j]]["xml:lang"];
			}else{
				strtemp = undefined;
			}
			if(strtemp != undefined){
				addlist.push({type: strtype ,value:strtemp, lang: strlang});
			}else{
				addlist.push({type: undefined ,value:undefined, lang:undefined});
			}
		}
		dlist.push(addlist);
	}

	result.keylist = varlist;
	result.valuelist = dlist;
	result.jsonlist = data;
	result.now = -1;
	result.next = function(){
		this.now++;
		if(this.now >= this.getValueListLength()){
			return false;
		}else{
			return true;
		}
	}
	result.getValue = function(v){
		if(this.now == -1){
			console.log("Error. Please use the 'next()' before use 'getValue()'.");
		}else{
			if(typeof v == "string"){
				var varindex = this.keylist.indexOf(v);
				if(varindex == -1){
					return undefined;
				}else{
					return this.valuelist[this.now][varindex].value;
				}
			}else if(typeof v == "number"){
				return this.valuelist[this.now][v].value;
			}
		}
	}
	result.getType = function(v){
		if(this.now == -1){
			console.log("Error. Please use the 'next()' before use 'getType()'.");
		}else{
			if(typeof v == "string"){
				var varindex = this.keylist.indexOf(v);
				if(varindex == -1){
					return undefined;
				}else{
					return this.valuelist[this.now][varindex].type;
				}
			}else if(typeof v == "number"){
				return this.valuelist[this.now][v].type;
			}
		}
	}
	result.getLang = function(v){
		if(this.now == -1){
			console.log("Error. Please use the 'next()' before use 'getLang()'.");
		}else{
			if(typeof v == "string"){
				var varindex = this.keylist.indexOf(v);
				if(varindex == -1){
					return undefined;
				}else{
					return this.valuelist[this.now][varindex].lang;
				}
			}else if(typeof v == "number"){
				return this.valuelist[this.now][v].lang;
			}
		}
	}
	result.getKey = function(i){
		return this.keylist[i];
	}
	result.getKeyList = function(){
		return this.keylsit;
	}
	result.getList = function(){
		return this.valuelist[this.now];
	}
	result.getValueList = function(){
		return this.valuelist;
	}
	result.getJson = function(){
		return this.jsonlist;
	}
	result.getKeyListLength = function(){
		return this.keylist.length;
	}
	result.getLength = function(){
		if(this.now == -1){
			console.log("Error. Please use the 'next()' before use 'getLength()'.");
		}else{
			return this.valuelist[this.now].length;
		}
	}
	result.getValueListLength = function(){
		return this.valuelist.length;
	}
	result.reset = function(){
		this.now = -1;
	}

	return result;
}
