/*
Reference Code: https://github.com/KDawg/S3DeployJS/blob/master/S3Deploy.js
Credentials are stored at ~/.aws/credentials
 */

var BUCKET_NAME = "theburrittcup.com";
var fs = require("fs");
var path = require("path");
var aws = require("aws-sdk");
var s3 = new aws.S3();

if (process.argv.length < 3) noParamsGiven();
else runWithParams();

function noParamsGiven() {
    showUsage();
    process.exit(-1);
}

function runWithParams() {
    console.log("S3 Deployer ... running option is [" + process.argv[2] + "]");

    if (process.argv[2] === "uploadObjects") uploadObjects();
    else if (process.argv[2] === "createBucket") createBucket(BUCKET_NAME);
    else console.log("...that option isn't recognized");
}

function uploadObjects() {
    var CODE_PATH = "./dist";
    var fileList = walkTree(CODE_PATH);

    fileList.forEach(function (entry) {
        uploadFile(entry.replace("dist/", ""), "./" + entry);
    });
}

function walkTree(dir) {
    return fs.readdirSync(dir)
        .reduce((files, file) =>
                fs.statSync(path.join(dir, file)).isDirectory() ?
                    files.concat(walkTree(path.join(dir, file))) :
                    files.concat(path.join(dir, file)),
            []);
}

function uploadFile(remoteFilename, fileName) {
    var fileBuffer = fs.readFileSync(fileName);
    var metaData = getContentTypeByFile(fileName);

    s3.putObject({
        ACL: "public-read",
        Bucket: BUCKET_NAME,
        Key: remoteFilename,
        Body: fileBuffer,
        ContentType: metaData
    }, function (error, response) {
        console.log("uploaded file[" + fileName + "] to [" + remoteFilename + "] as [" + metaData + "]");
        console.log(arguments);
    });
}

function getContentTypeByFile(fileName) {
    var rc = "application/octet-stream";
    var fileNameLowerCase = fileName.toLowerCase();

    if (fileNameLowerCase.indexOf(".html") >= 0) rc = "text/html";
    else if (fileNameLowerCase.indexOf(".css") >= 0) rc = "text/css";
    else if (fileNameLowerCase.indexOf(".json") >= 0) rc = "application/json";
    else if (fileNameLowerCase.indexOf(".js") >= 0) rc = "application/x-javascript";
    else if (fileNameLowerCase.indexOf(".png") >= 0) rc = "image/png";
    else if (fileNameLowerCase.indexOf(".jpg") >= 0) rc = "image/jpg";

    return rc;
}


function createBucket(bucketName) {
    s3.createBucket({Bucket: bucketName}, function () {
        console.log("created the bucket[" + bucketName + "]");
        console.log(arguments);
    });
}


function showUsage() {
    console.log("Use choosing one of these command line parameters:");
    console.log("  uploadObjects");
    console.log("  createBucket");
}