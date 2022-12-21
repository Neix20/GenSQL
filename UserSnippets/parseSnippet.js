let str = `
from flask import Flask
from flask_cors import CORS

import os

import controller

app = Flask(__name__)

# Add Routing
app.register_blueprint(controller.\${1:controller_file_name}, url_prefix="/\${2:controller_name}")

@app.route('/', methods=["GET"])
def index():
    file_dir = f"{os.getcwd()}\\public\\index.html"
    
    # Read File
    inFile = open(file_dir, "r")
    
    line = inFile.read()
    
    return line

if __name__ == '__main__':
    CORS(app)
    app.run(host='0.0.0.0', port=5050, debug=True)
`;

// Split Into Array
let arr = str.split("\n");

// Remove First and Last
arr = arr.slice(1, -1);

// Add Slash Before Each Double Quotes
arr = arr.map(val => {
    let rgx;

    // Remove WhiteSpace
    rgx = /\s[4, ]/g;
    val = val.replace(rgx, " ");

    rgx = /\s[2, ]/g;
    val = val.replace(rgx, "\\t");

    rgx = /"/g;
    val = val.replace(rgx, `\\"`);

    return `"${val}"`;
});

let res = "";

res = `[
${arr.join(",\n")}
]`;

console.log(res);
