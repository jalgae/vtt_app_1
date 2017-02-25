

jQuery(function ($) {
    document.getElementById("gform_submit_button_26").addEventListener("click", function () {

        var q1a = document.getElementById("input_26_1").value;
        var q1b = document.getElementById("input_26_2").value;
        var q1c = document.getElementById("input_26_3").value;
        var q1d = document.getElementById("input_26_4").value;
        var q1e = document.getElementById("input_26_5").value;
        var q1f = document.getElementById("input_26_6").value;
        var q2 = document.getElementById("input_26_7").value;
        var q3 = document.getElementById("input_26_8").value;
        var q4 = document.getElementById("input_26_9").value;
        var q5 = document.getElementById("input_26_10").value;

        var classic = document.getElementById("choice_26_17_1").checked; //choice_26_17_1
        var modern = document.getElementById("choice_26_17_1").checked; //choice_26_17_1
        var mature = document.getElementById("choice_26_17_3").checked; // choice_26_17_3
        var youth = document.getElementById("choice_26_17_4").checked; // choice_26_17_4
        var fem = document.getElementById("choice_26_17_5").checked; // choice_26_17_5
        var mascu = document.getElementById("choice_26_17_6").checked; // choice_26_17_6
        var play = document.getElementById("choice_26_17_7").checked; // choice_26_17_7
        var sophi = document.getElementById("choice_26_17_8").checked; // choice_26_17_8
        var econo = document.getElementById("choice_26_17_9").checked; // choice_26_17_9
        var lux = document.getElementById("choice_26_17_11").checked; // choice_26_17_11
        var organic = document.getElementById("choice_26_17_13").checked; // choice_26_17_13
        var geo = document.getElementById("choice_26_17_12").checked; // choice_26_17_12
        var abs = document.getElementById("choice_26_17_14").checked; // choice_26_17_14
        var lit = document.getElementById("choice_26_17_15").checked; // choice_26_17_15

        var choice = "";
        if (classic) { choice += "Classic "; }
        if (modern) { choice += "Modern "; }
        if (mature) { choice += "Mature "; }
        if (youth) { choice += "Youthful "; }
        if (fem) { choice += "Feminine "; }
        if (mascu) { choice += "Masculine "; }
        if (play) { choice += "Playful "; }
        if (sophi) { choice += "Sophisticated "; }
        if (econo) { choice += "Economical "; }
        if (lux) { choice += "Luxurious "; }
        if (organic) { choice += "Organic ";}
        if (geo) { choice += "Geometric "; }
        if (abs) { choice += "Abstract "; }
        if (lit) { choice += "Literal "}
        choice += "\n";

        var q6 = document.getElementById("input_26_18").value;
        
        var grp1 = document.getElementById("input_26_35").value;
        var grp2 = document.getElementById("input_26_34").value;
        var grp3 = document.getElementById("input_26_33").value;
        var grp4 = document.getElementById("input_26_32").value;
        var grp5 = document.getElementById("input_26_31").value;
        var grp6 = document.getElementById("input_26_30").value;
        var grp7 = document.getElementById("input_26_29").value;

        $.post('http://188.166.233.112/lq/api', {
            "1_q_a": (q1a) ? q1a : "",
            "1_q_b": (q1b) ? q1b : "",
            "1_q_c": (q1c) ? q1c : "",
            "1_q_d": (q1d) ? q1d : "",
            "1_q_e": (q1e) ? q1e : "",
            "1_q_f": (q1f) ? q1f : "",
            "2_q": (q2) ? q2 : "",
            "3_q": (q3) ? q3 : "",
            "4_q": (q4) ? q4 : "",
            "5_q": (q5) ? q5 : "",
            "6_q": (q6) ? (choice + q6) : choice,
            "grp_1": (grp1) ? grp1 : "",
            "grp_2": (grp2) ? grp2 : "",
            "grp_3": (grp3) ? grp3 : "",
            "grp_4": (grp4) ? grp4 : "",
            "grp_5": (grp5) ? grp5 : "",
            "grp_6": (grp6) ? grp6 : "",
            "grp_7": (grp7) ? grp7 : "",
        });
    });
})