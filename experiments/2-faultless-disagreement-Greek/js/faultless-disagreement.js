



function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions1 = slide({
    name : "instructions1",
    start: function() {
      $(".instruction_condition").html("Between subject intruction manipulation: "+ exp.instruction);
    }, 
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.multi_slider = slide({
    name : "multi_slider",
    present : _.shuffle(stimuli),
    present_handle : function(stim) {
      $(".err").hide();
      this.init_sliders();      
      exp.sliderPost = null;
      // $('input[name="sense"]:checked').attr('checked',false);
      this.stim = stim; //FRED: allows you to access stim in helpers
      //var noun_data = _.sample(corpus.Noun)
      //this.noun_data = noun_data;
      //var noun = noun_data.noun;
      //var animacy = noun_data.animacy;

      this.verbs = _.shuffle(["είναι","δεν είναι"])

      var names_list = _.shuffle(names);

      var name1 = names_list[0];
      var name2 = names_list[1];

      if (name1.gender == "M") {
        $(".name1DetCap").html("Ο"); 
        $(".name1DetLow").html("ο"); 
      } else {
        $(".name1DetCap").html("Η"); 
        $(".name1DetLow").html("η"); 
      }

      if (name2.gender == "M") {
        $(".name2DetCap").html("Ο"); 
        $(".name2DetLow").html("ο"); 
      } else {
        $(".name2DetCap").html("Η"); 
        $(".name2DetLow").html("η"); 
      }

      $(".name1").html(name1.name);

      $(".name2").html(name2.name);

      $(".noun").html(stim.Noun);

      if (stim.Noun=="καναπές") {
        $("#sameNoun").html("καναπέ");
      } else {
        $("#sameNoun").html(stim.Noun);
      }

      if (stim.NounGender=="masculine") {
        var the_same = "τον ίδιο"
        var adjective = stim.Predicate.Predicate
        var that = "Αυτός ο"
      } else if (stim.NounGender=="feminine") {
        var the_same = "την ίδια"
        var adjective = stim.Predicate.FemPredicate
        var that = "Αυτή η"
      } else {
        var the_same = "το ίδιο"
        var adjective = stim.Predicate.NeuPredicate
        var that = "Αυτό το"
      }

      $(".the_same").html(the_same)


      $(".utterance1").html("\"" + that + " " + stim.Noun + " " + this.verbs[0] + " " + adjective + ".\"");

      $(".utterance2").html("\"Κάνεις λάθος. " + that + " " + stim.Noun + " " + this.verbs[1] + " "  + adjective + ".\"");

      if (name1.gender == "F" & name2.gender == "F") {
        $("#wrong").html("Όχι, κάποια από τις δύο πρέπει να κάνει λάθος.");
      } else {
        $("#wrong").html("Όχι, κάποιος από τους δύο πρέπει να κάνει λάθος.");
      }

		  this.n_sliders = 1;
//      $(".slider_row").remove();
//      for (var i=0; i<this.n_sliders; i++) {
//        var sentence_type_left = this.sentence_types[0];
//        var sentence_type_left = this.sentence_types[1];        
//        var sentence_left = sentences[sentence_type_left];
//        var sentence_right = sentences[sentence_type_right];        
//        $("#multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence0">' + "<font size='4'>" + sentence_left + "</font>" + '</td><td colspan="2"><div id="slider0" class="slider">-------[ ]--------</div></td><td class="slider_target" id="sentence1">' + "<font size='4'>" + sentence_right + "</font>" + '</td></tr>');
//        utils.match_row_height("#multi_slider_table", ".slider_target");
//      }

    },

    button : function() {
    	console.log(exp.sliderPost);
      if (exp.sliderPost != null) {
        this.log_responses();
        _stream.apply(this); //use exp.go() if and only if there is no "present" data.
      } else {
        $(".err").show();
      }
    },

    init_sliders : function() {
      utils.make_slider("#slider0", function(event, ui) {
        exp.sliderPost = ui.value;
      });
    },
//    make_slider_callback : function(i) {
//      return function(event, ui) {
//        exp.sliderPost[i] = ui.value;
//      };
//    },
    log_responses : function() {
        exp.data_trials.push({
          "response" : exp.sliderPost,
          "noun" : this.stim.NounTranslation,          
          "predicate" : this.stim.Predicate.Translation,
          "nounclass" : this.stim.NounClass,
          "class" : this.stim.Predicate.Class,                    
          "firstutterance" : this.verbs[0],      
          "slide_number" : exp.phase
        });
    },
  });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
        prolific: $("#prolificID").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          //"condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {
        turk.submit(exp.data);
        console.log("submitting");
      }, 500);
    }
  });

  return slides;
}

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  exp.instruction = _.sample(["instruction1","instruction2"]);
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0", "instructions1",'multi_slider', 'subj_info', 'thanks'];
  
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}