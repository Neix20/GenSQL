namespace DAL
{
    public partial class TNtlLogs
    {
        public int id { get; set; }
        public string name { get; set; }
public string filePath { get; set; }
public string created_by { get; set; }
public Nullable<System.DateTime> created_date { get; set; }
public string last_updated_by { get; set; }
public Nullable<System.DateTime> last_updated_date { get; set; }
    }
}