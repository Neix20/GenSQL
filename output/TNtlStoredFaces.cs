namespace DAL
{
    public partial class TNtlStoredFaces
    {
        public int id { get; set; }
        public string name { get; set; }
public string status { get; set; }
public string original_img_path { get; set; }
public string created_by { get; set; }
public Nullable<System.DateTime> created_date { get; set; }
public string last_updated_by { get; set; }
public Nullable<System.DateTime> last_updated_date { get; set; }
    }
}