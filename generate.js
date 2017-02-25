

var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');

var email = require('./email');

var _excel = require('exceljs'); 


var _gen = {};


function transform (content, data) {
    var zip = new JSZip(content);
    var row = data.data;
    var doc = new Docxtemplater();
    
    doc.loadZip(zip);
    // null,null,null,null,null,null,null,"Website - Personal branding","Text","LewisHowes.com, Mikedillard.com, CharlesNgo.com","No. I live Blue's and greys but open to any \"welcoming\" color scheme","Modern, Luxurious",null,79,10,86,88,70,73,76
    
    var q6 = "";
    if (row[11] || row[12]) {
        if (row[11]) {
            q6 += row[11] + " - \n\n";
        }
        if (row[12]) {
            q6 += row[12];
        }
    }

    doc.setData({
        "1_q_a": ( row[1] ) ? String(row[1]) : '',
        "1_q_b": ( row[2] ) ? String(row[2]) : '',
        "1_q_c": ( row[3] ) ? String(row[3]) : '',
        "1_q_d": ( row[4] ) ? String(row[4]) : '',
        "1_q_e": ( row[5] ) ? String(row[5]) : '',
        "1_q_f": ( row[6] ) ? String(row[6]) : '',
        "2_q": ( row[7] ) ? String(row[7]) : '',
        "3_q": ( row[8] ) ? String(row[8]) : '',
        "4_q": ( row[9] ) ? String(row[9]) : '',
        "5_q": ( row[10] ) ? String(row[10]) : '',
        "6_q": q6,
        "grp_1": ( row[13] ) ? String(row[13]) : '',
        "grp_2": ( row[14] ) ? String(row[14]) : '',
        "grp_3": ( row[15] ) ? String(row[15]) : '',
        "grp_4": ( row[16] ) ? String(row[16]) : '',
        "grp_5": ( row[17] ) ? String(row[17]) : '',
        "grp_6": ( row[18] ) ? String(row[18]) : '',
        "grp_7": ( row[19] ) ? String(row[19]) : ''
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
    let file = `${__dirname}/output/${data.filename}.docx`
    fs.writeFileSync(file, buf);
}

function proc_data (data) {
    var content = fs
        .readFileSync(`${__dirname}/template/LogoQuestionnaire-EliCopy.docx`, 'binary');
    
    var outputFiles = [];

    function iterate (i, _data) {
        if (i < _data.length) {

            transform(content, _data[i]);            

            iterate(++i, _data);
        } else {
            
        }
    } 

    iterate(0, data)
}

_gen.proc_excel = function (req, res) {

    if (!req.files) {
        return res.redirect("/");
    }

    var excelfile = req.files.excelfile;
    var filename = req.files.excelfile.name;
    var filedir = `${__dirname}/worksheet/${filename}`; 

    excelfile.mv(filedir, function (err) {
        if (err) {
            return res.redirect("/");
        }
        var wb = new _excel.Workbook();
        var data = [];
        wb.xlsx.readFile(filedir).then(function() {
            wb.eachSheet(function(sheet, id) {
                var worksheet = wb.getWorksheet(sheet.name);
                worksheet.eachRow({ includeEmpty: true }, function(row, index) {
                    if (index !== 1) {
                        data.push({
                            index: index,
                            filename: `client_${index}_${new Date().getTime()}`,
                            data: row.values
                        });
                    }
                });
            });
            proc_data(data);
            //sendMultiFiles(data);
            var i = 0;
            var len = data.length;
            var batches = [];
            while( i < len){
                var end = i + 5;
                if (end > len) {
                    end = len;
                }
                var batch = []
                for (var j = i; j < end; j++) {
                    batch.push(data[j]);
                }
                batches.push(batch);
                i += 5;
            }
            
            for (var i = 0; i < batches.length; i++) {
                email.sendMultiFiles(batches[i])
            }
        });

        res.redirect('/success');
    });   
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










