SPARQL_Result_Parser
=============
JSONで受け取ったSPARQLの検索結果をイテレータ風に扱えるよう加工してくれるライブラリ。

`<script type="text/javascript" src="result_parser.js"></script>`といった感じに読み込んで使用してください。

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

主なメソッド一覧
---------------
*getJson()	検索結果をJSON形式で取得する
*getKeyList()	KeyListを配列として取得する
*getKeyListLength()	KeyListの長さを数値として取得する
**getKey(i)	KeyListのi番目の値を取得する*
*getValueList()	ValueListを配列として取得する
*getValueListLength()	ValueListの長さを数値として取得する
**next()	ValueListを1行分進める。ValueListの長さを超えた場合falseを返し、そうでない場合はtrueを返す*
*getList()	ValueListの現在いる行の内容を配列として取得する
*getLength()	ValueListの現在いる行の配列長を数値として取得する
**getValue(keyname)	ValueListの現在いる行から変数名を指定して値を取得する。数値を指定した場合KeyListに準じた順に値を取り出す*
*getType(keyname)	getValue()と同じ方法で値の型を取り出す(例：uri, literal)
*getLang(keyname)	getValue()と同じ方法で値の言語情報を取得する(例:en, ja)
*reset()	next()で進められた行数をリセットする。
