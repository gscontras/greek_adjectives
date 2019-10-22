// 40 most frequent noun-predicate combinations in the BNC

//[
//		{"Sentence": "box red", "Predicate": "red", "Noun": "box"},
//		{"Sentence": "box big", "Predicate": "big", "Noun": "box"}
//		]

var adjectives = _.shuffle([ 
		{"Predicate":"κόκκινος", "Class":"color", "Translation":"red", "FemPredicate" : "κόκκινη", "NeuPredicate" :"κόκκινο" },
		{"Predicate":"κίτρινος", "Class":"color", "Translation":"yellow", "FemPredicate" : "κίτρινη", "NeuPredicate" :"κίτρινο"},
		{"Predicate":"πράσινος", "Class":"color", "Translation":"green", "FemPredicate" : "πράσινη", "NeuPredicate" :"πράσινο"},
		{"Predicate":"μπλε", "Class":"color", "Translation":"blue", "FemPredicate" : "μπλε", "NeuPredicate" :"μπλε" },
		{"Predicate":"μωβ", "Class":"color", "Translation":"purple", "FemPredicate" : "μωβ", "NeuPredicate" :"μωβ"},
		{"Predicate":"καφέ", "Class":"color", "Translation":"brown", "FemPredicate" : "καφέ", "NeuPredicate" :"καφέ"},											
		{"Predicate":"μεγάλος", "Class":"size", "Translation":"big", "FemPredicate" : "μεγάλη", "NeuPredicate" :"μεγάλο"},
		{"Predicate":"μικρός", "Class":"size", "Translation":"small", "FemPredicate" : "μικρή", "NeuPredicate" :"μικρό"},					
		// {"Predicate":"τεράστιος", "Class":"size", "Translation":"huge", "FemPredicate" : "τεράστια", "NeuPredicate" :"τεράστιο"},					
		{"Predicate":"μικροσκοπικός", "Class":"size", "Translation":"tiny", "FemPredicate" : "μικροσκοπική", "NeuPredicate" :"μικροσκοπικό"},					
		{"Predicate":"κοντός", "Class":"size", "Translation":"short", "FemPredicate" : "κοντή", "NeuPredicate" :"κοντό"},					
		{"Predicate":"μακρύς", "Class":"size", "Translation":"long", "FemPredicate" : "μακριά", "NeuPredicate" :"μακρύ"},							
		{"Predicate":"ξύλινος", "Class":"material", "Translation":"wooden", "FemPredicate" : "ξύλινη", "NeuPredicate" :"ξύλινο"},
		{"Predicate":"πλαστικός", "Class":"material", "Translation":"plastic", "FemPredicate" : "πλαστική", "NeuPredicate" :"πλαστικό"},
		{"Predicate":"μεταλλικός", "Class":"material", "Translation":"metal", "FemPredicate" : "μεταλλική", "NeuPredicate" :"μεταλλικό"},
		{"Predicate":"λείος", "Class":"texture", "Translation":"smooth", "FemPredicate" : "λεία", "NeuPredicate" :"λείο"},
		{"Predicate":"σκληρός", "Class":"texture", "Translation":"hard", "FemPredicate" : "σκληρή", "NeuPredicate" :"σκληρό"},
		{"Predicate":"μαλακός", "Class":"texture", "Translation":"soft", "FemPredicate" : "μαλακή", "NeuPredicate" :"μαλακό"},
		{"Predicate":"παλιός", "Class":"age", "Translation":"old", "FemPredicate" : "παλιά", "NeuPredicate" :"παλιό"},
		{"Predicate":"καινούργιος", "Class":"age", "Translation":"new", "FemPredicate" : "καινούργια", "NeuPredicate" :"καινούργιο"},
		{"Predicate":"σάπιος", "Class":"age", "Translation":"rotten", "FemPredicate" : "σάπια", "NeuPredicate" :"σάπιο"},
		{"Predicate":"φρέσκος", "Class":"age", "Translation":"fresh", "FemPredicate" : "φρέσκια", "NeuPredicate" :"φρέσκο"},
		{"Predicate":"καλός", "Class":"quality", "Translation":"good", "FemPredicate" : "καλή", "NeuPredicate" :"καλό"},
		{"Predicate":"χαλασμένος", "Class":"quality", "Translation":"broken", "FemPredicate" : "χαλασμένη", "NeuPredicate" :"χαλασμένο"},
		{"Predicate":"στρογγυλός", "Class":"shape", "Translation":"round", "FemPredicate" : "στρογγυλή", "NeuPredicate" :"στρογγυλό"},						
		{"Predicate":"τετράγωνος", "Class":"shape", "Translation":"square", "FemPredicate" : "τετράγωνη", "NeuPredicate" :"τετράγωνο"}
]);

// var she_adjectives = _.shuffle([
// 		{"Predicate":"ÇäÍåÑÇÁ", "Class":"color", "Translation":"red"},
// 		{"Predicate":"ÇäÕáÑÇÁ", "Class":"color", "Translation":"yellow"},
// 		{"Predicate":"ÇäÎÖÑÇÁ", "Class":"color", "Translation":"green"},
// 		{"Predicate":"ÇäÒÑâÇÁ", "Class":"color", "Translation":"blue"},
// 		{"Predicate":"ÇäÈæáÓÌêÉ", "Class":"color", "Translation":"purple"},
// 		{"Predicate":"ÇäÈæêÉ", "Class":"color", "Translation":"brown"},											
// 		{"Predicate":"ÇäãÈêÑÉ", "Class":"size", "Translation":"big"},
// 		{"Predicate":"ÇäÕÚêÑÉ", "Class":"size", "Translation":"small"},					
// 		{"Predicate":"ÇäÖÎåÉ", "Class":"size", "Translation":"huge"},					
// 		//{"Predicate":"tiny", "Class":"size", "Translation":"tiny"},					
// 		{"Predicate":"ÇäâÕêÑÉ", "Class":"size", "Translation":"short"},					
// 		{"Predicate":"Çä×èêäÉ", "Class":"size", "Translation":"long"},							
// 		{"Predicate":"ÇäÎÔÈêÉ", "Class":"material", "Translation":"wooden"},
// 		{"Predicate":"ÇäÈäÇÓÊêãêÉ", "Class":"material", "Translation":"plastic"},
// 		{"Predicate":"ÇäåÙÏæêÉ", "Class":"material", "Translation":"metal"},
// 		{"Predicate":"ÇäåäÓÇÁ ", "Class":"texture", "Translation":"smooth"},
// 		{"Predicate":"ÇäÕäÈÉ", "Class":"texture", "Translation":"hard"},
// 		{"Predicate":"ÇäæÇÙåÉ", "Class":"texture", "Translation":"soft"},
// 		{"Predicate":"ÇäâÏêåÉ", "Class":"age", "Translation":"old"},
// 		{"Predicate":"ÇäÌÏêÏÉ", "Class":"age", "Translation":"new"},
// 		{"Predicate":"ÇäáÇÓÏÉ", "Class":"age", "Translation":"rotten"},
// 		{"Predicate":"Çä×ÇÒÌÉ", "Class":"age", "Translation":"fresh"},
// 		{"Predicate":"ÇäÌêÏÉ", "Class":"quality", "Translation":"good"},
// 		{"Predicate":"ÇäÓêÆÉ", "Class":"quality", "Translation":"bad"},
// 		{"Predicate":"ÇäåÓÊÏêÑÉ", "Class":"shape", "Translation":"round"},						
// 		{"Predicate":"ÇäåÑÈÙÉ", "Class":"shape", "Translation":"square"}
// ]);

var nouns = [
		{"Noun":"τυρί", "NounClass":"food", "Translation":"cheese", "Gender" : "neuter"},
		{"Noun":"καρέκλα", "NounClass":"furniture", "Translation":"chair", "Gender" : "feminine"},								
		{"Noun":"τηλεόραση", "NounClass":"furniture", "Translation":"TV", "Gender" : "feminine"},								
		{"Noun":"γραφείο", "NounClass":"furniture", "Translation": "desk", "Gender" : "neuter"},								
		{"Noun":"μήλο", "NounClass":"food", "Translation":"apple", "Gender" : "neuter"},
		{"Noun":"μπανάνα", "NounClass":"food", "Translation":"banana" , "Gender" : "feminine"},
		{"Noun":"καρότο", "NounClass":"food", "Translation":"carrot", "Gender" : "neuter"},
		{"Noun":"ντομάτα", "NounClass":"food", "Translation":"tomato", "Gender" : "feminine"},								
		{"Noun":"καναπές", "NounClass":"furniture", "Translation":"couch", "Gender" : "masculine"},								
		{"Noun":"βεντάλια", "NounClass":"furniture", "Translation":"fan", "Gender" : "feminine"}								
];

// var nouns = [
// 		{"Noun":"ÇäÌÈæ", "NounClass":"food", "Translation":"cheese"},
// 		{"Noun":"ÇäãÑÓê", "NounClass":"furniture", "Translation":"chair"},								
// 		{"Noun":"ÇäÊäáÇÒ", "NounClass":"furniture", "Translation":"TV"},								
// 		{"Noun":"ÇäåãÊÈ", "NounClass":"furniture", "Translation": "desk"}								
// ];

// var she_nouns = [
// 		{"Noun":"ÇäÊáÇÍÉ", "NounClass":"food", "Translation":"apple"},
// 		{"Noun":"ÇäåèÒÉ", "NounClass":"food", "Translation":"banana" },
// 		{"Noun":"ÇäÌÒÑÉ", "NounClass":"food", "Translation":"carrot"},
// 		{"Noun":"Çä×åÇ×å", "NounClass":"food", "Translation":"tomato"},								
// 		{"Noun":"ÇäãæÈÉ", "NounClass":"furniture", "Translation":"couch"},								
// 		{"Noun":"ÇäåÑèÍÉ", "NounClass":"furniture", "Translation":"fan"}								
// ];

var stimuli =  makeStims();

function makeStims() {
	stims = [];

	while (stims.length < 26) {
		noun = _.sample(nouns);
		pred1 = _.sample(adjectives);
		pred2 = _.sample(adjectives);
		if (pred1.Class!=pred2.Class) {
			stims.push(
				{
					"Predicate1":pred1,
					"Class1":pred1.Class,	
					"Predicate2":pred2,
					"Class2":pred2.Class,			
					"Noun":noun.Noun,
					"NounClass":noun.NounClass,
					"NounGender":noun.Gender,
					"NounTranslation":noun.Translation
				}			
			);
		}
	}
		
	return stims;
	
}