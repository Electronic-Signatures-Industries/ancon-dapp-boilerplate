const libxmljs = require('libxmljs');
const fs = require('fs');
const { create, convert, createCB, fragmentCB } = require('xmlbuilder2');
const filename = process.env.XSD;
const xsd = libxmljs.parseXmlString(fs.readFileSync(`./${filename}`))
const xs =  {
    xs: 'http://www.w3.org/2001/XMLSchema'
};
const path = '//xs:enumeration';
const nodes = xsd.find(path,xs);

const json =  nodes.map(el  => {
    return {
        key: el.attr('value').value(),
        value: el.text().trim(),
    }
});
fs.writeFileSync(`./${filename}.json`, JSON.stringify(json))