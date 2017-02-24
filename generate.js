

var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');

var email = require('./email');

var _gen = {};

_gen.proc_excel = function (req, res) {

}

_gen.proc_api = function (req, res) {
    console.log(req.body);
    var q = req.body;

    var content = fs
        .readFileSync(`${__dirname}/template/LogoQuestionnaire-EliCopy.docx`, 'binary');

    var zip = new JSZip(content);

    var doc = new Docxtemplater();
    doc.loadZip(zip);

    doc.setData({
        "1_q_a": ( q["1_q_a"] ) ? String(q["1_q_a"]) : '',
        "1_q_b": ( q["1_q_b"] ) ? String(q["1_q_b"]) : '',
        "1_q_c": ( q["1_q_c"] ) ? String(q["1_q_c"]) : '',
        "1_q_d": ( q["1_q_d"] ) ? String(q["1_q_d"]) : '',
        "1_q_e": ( q["1_q_e"] ) ? String(q["1_q_e"]) : '',
        "1_q_f": ( q["1_q_f"] ) ? String(q["1_q_f"]) : '',
        "2_q": ( q["2_q"] ) ? String(q["2_q"]) : '',
        "3_q": ( q["3_q"] ) ? String(q["3_q"]) : '',
        "4_q": ( q["4_q"] ) ? String(q["4_q"]) : '',
        "5_q": ( q["5_q"] ) ? String(q["5_q"]) : '',
        "6_q": ( q["6_q"] ) ? String(q["6_q"]) : '',
        "grp_1": ( q["grp_1"] ) ? String(q["grp_1"]) : '',
        "grp_2": ( q["grp_2"] ) ? String(q["grp_2"]) : '',
        "grp_3": ( q["grp_3"] ) ? String(q["grp_3"]) : '',
        "grp_4": ( q["grp_4"] ) ? String(q["grp_4"]) : '',
        "grp_5": ( q["grp_5"] ) ? String(q["grp_5"]) : '',
        "grp_6": ( q["grp_6"] ) ? String(q["grp_6"]) : '',
        "grp_7": ( q["grp_7"] ) ? String(q["grp_7"]) : ''
    });

    try {
        doc.render()
    }
    catch (error) {
        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
        }
        console.log(JSON.stringify({error: e}));
        throw error;
    }

    var buf = doc.getZip()
                .generate({type: 'nodebuffer'});
    let tm = new Date().getTime();
    let file = `${__dirname}/output/client_${tm}.docx`
    let name = `client_${tm}.docx`
    fs.writeFileSync(file, buf);

    email.send(file, name);
    res.send('OK');
}


module.exports = _gen;










