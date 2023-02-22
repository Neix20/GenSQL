`
[HttpGet()]
public HttpResponseMessage \${1:funcName}([FromBody] JToken postData)
{
    string Result = "";
    string ResponseCode = clsConst.const_ResponseCode_SystemError;
    JObject jobj = new JObject();
    try
    {
        string Messaging = postData.ToString();

        // Log FileName
        clsLogger.InfoLog("\${2:projName} \${1:funcName}");
        clsLogger.InfoLog(Messaging);

        // Parameters
        \${3:// params}

        bool flag = false;

        // Condition
        \${4:// condition}

        if (flag)
        {
            ResponseCode = clsConst.const_ResponseCode_Successful;
        }
        else
        {
            ResponseCode = clsConst.const_Response_Code_API_MissingInformation;
        }
    }
    catch (Exception ex)
    {
        clsLogger.ErrorLog(fstrPageName + "\${1:funcName}", ex);
    }

    jobj[clsConst.const_Key_Field_ResponseCode] = ResponseCode;
    Result = ConvertJsonObjectToString(jobj);
    return ReturnResult(Result);
}
`