//  عناصر الإدخال
var siteNameInput = document.getElementById("bookmarkName");
var siteURLInput = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submit");
var tableContent = document.getElementById("tableContent");

//  مصفوفة لتخزين المواقع
var sites = [];

//  استرجاع البيانات من localStorage
if (localStorage.getItem("sitesList") != null) {
  sites = JSON.parse(localStorage.getItem("sitesList"));
  displaySites();
}

//  حدث عند الضغط على زر Submit
submitBtn.onclick = function () {
  addSite();
};

//  دالة الإضافة
function addSite() {
  var site = {
    name: siteNameInput.value.trim(),
    url: siteURLInput.value.trim(),
  };

  //  التحقق إن المدخلات مش فاضية
  if (site.name === "" || site.url === "") {
    alert("Please fill in both fields!");
    return;
  }

  //  التحقق إن الرابط يبدأ بـ http أو https
  if (!/^https?:\/\//i.test(site.url)) {
    alert("Please enter a valid URL starting with http:// or https://");
    return;
  }

  //  إضافة للمصفوفة وتحديث التخزين
  sites.push(site);
  localStorage.setItem("sitesList", JSON.stringify(sites));

  clearForm();
  displaySites();
}

//  دالة العرض  
function displaySites() {
  var html = "";
  for (var i = 0; i < sites.length; i++) {
    html += `
      <tr>
        <td>${i + 1}</td>
        <td>${sites[i].name}</td>
        <td><a href="${sites[i].url}" target="_blank" class="btn btn-success btn-sm">Visit</a></td>
        <td><button onclick="deleteSite(${i})" class="btn btn-danger btn-sm">Delete</button></td>
      </tr>
    `;
  }
  tableContent.innerHTML = html;
}

//دالة مسح 
function clearForm() {
  siteNameInput.value = "";
  siteURLInput.value = "";
}

//  دالة الحذف
function deleteSite(index) {
  sites.splice(index, 1);
  localStorage.setItem("sitesList", JSON.stringify(sites));
  displaySites();
}


function searchSite() {
    var searchValue = document.getElementById("searchInput").value.toLowerCase();
    var html = "";
  
    for (var i = 0; i < sites.length; i++) {
      if (sites[i].name.toLowerCase().includes(searchValue)) {
        html += `
          <tr>
            <td>${i + 1}</td>
            <td>${sites[i].name}</td>
            <td><a href="${sites[i].url}" target="_blank" class="btn btn-success btn-sm">Visit</a></td>
            <td><button onclick="deleteSite(${i})" class="btn btn-danger btn-sm">Delete</button></td>
          </tr>
        `;
      }
    }
  
    tableContent.innerHTML = html;
  }
  