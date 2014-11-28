SPARQL_Result_Parser
=============
JSONで受け取ったSPARQLの検索結果をイテレータ風に扱えるよう加工してくれるライブラリ。

<script type="text/javascript" src="js/result_parser.js"></script>といった感じに読み込んで使用してください。

使用例
------------
	$.ajax({
		url: "http://ja.dbpedia.org/sparql",
		data: {query: "select * where{?s ?p ?o}limit 100";output: "json"},
		success: makeTable
	});
	
	function makeTable(data){
		//エンドポイントから返ってきたjsonを引数として渡す
		result = resultParse(data);
		
		var str = new String("<tr>");
		for(var i=0; i<re.getKeyListLength();i++){
			str += "<td>"+re.getKey(i)+"</td>";
		}
		str += "</tr>";
		while(re.next()){ //検索結果を1組進める
			for(var i=0; i < re.getLength();i++){
				str += "<td><pre>"+re.getValue(i)+"</pre></td>";
				//ここではgetValueに数値を渡しているが
				//result.getValue("s")のようにSPARQL内で使用した変数名を直接指定することも可能
			}
			str += "</tr>";
		}
		$("#table1").append(str);
	}
