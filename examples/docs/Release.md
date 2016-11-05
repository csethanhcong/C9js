## NPM + Git Configurations

### Author:
	npm init-author-url / author-email / author-name / license (MIT)

### Package:
	npm set save-exact true : Help user to update depedencies if they're missing or out-of-date

### Version: (Release Git )
	git tag 1.0.0
	git push --tags

### Publish: (Release npm)
	npm publish

### Notes:

- Version <x.y.z>: Remember to update version in package.json file
	- `x`: major changes in API, e.g. name of function, functionality
	- `y`: minor changes, e.g. update some functionalities
	- `z`: fix bugs


- Run: 
	npm run commit
	git push

- When commit to Git, don't push dist/ folder, only push when release

# Development Process

### Commitizen & Cz-conventional-changelog:

- Tự động format commit messages, kiểm soát trạng thái issues (open/close) trên GitHub, hiển thị changelog sau mỗi lần cập nhật code.

### Mocha / Chai:

- Thư viện hỗ trợ thực thi `Unit Test`. Thông qua miêu tả các hành động (action) / chức năng (functionality) và các giá trị output mong muốn để kiểm tra tính đúng đắn của mã nguồn.

> http://chaijs.com/

> https://mochajs.org/

### Codecov.io: 

Công cụ hỗ trợ tạo report về tính chính xác (test case pass / fail), số lượng line/function/statement/branch được cover, tạo tính ổn định và sự tin cậy cho mã nguồn

> https://codecov.io/

Với các features mạnh mẽ:

- `Browser Extension`: Hỗ trợ xuất report với các đo đạc, thông số trên browser. Dễ dàng tracking và có cái nhìn tổng quan.

- `Auto-Merging Builds`: Hỗ trợ hầu hết các ngôn ngữ, kết hợp CI và build trong một report

- `Notifications`: Gửi thông báo qua nhiều kênh giao tiếp như Slack, Gitter, Hipchat, hỗ trợ tạo Webhook,.. 

- `Coverage Compare`: So sánh khác biệt trong sự thay đổi mã nguồn nhờ 
	
	> git diff

### Semantic Release:

> https://github.com/semantic-release/semantic-release

Công cụ tự động phát hiện các thay đổi dựa trên commit, sau đó phân loại các thay đổi này vào các dạng:

1. Release bản mới
2. Release tính năng mới
3. Release những thay đổi mới

Và quyết định thay đổi version cần thiết với định dạng `x.x.x`, mỗi con số đại diện cho một ý nghĩa khác nhau

Việc cuối cùng *SR* thực hiện là publish lên [`npm`](http://npmjs.com)



### Travis CI: 
- __Khái niệm CI (Continuous Integration)__:

Là mục tiêu mà các team phát triển phần mềm theo tư tưởng Agile hướng tới. Một dạng tracking công việc trong team, kiểm thử tự động, dễ dàng truy hồi để phát hiện lỗi một cách nhanh chóng. 

Có thể hiểu `CI` về mặt kỹ thuật là một container bao hàm toàn bộ các công cụ đã liệt kê ở trên, tích hợp vào một platform và chạy trên server được chỉ định.

> Trích: http://www.ibm.com/developerworks/vn/library/rational/201301/continuous-integration-agile-development/

>> Nguồn: https://toidicodedao.com/2015/08/27/giai-thich-don-gian-ve-ci-continuous-integration-tich-hop-lien-tuc/

- __Travis CI__: 

Hệ thống hiện thực CI nhanh chóng và gọn lẹ, tích hợp với GitHub, GitLab, Bitbucket. Mỗi lần commit code, hệ thống sẽ tự động lấy code từ nguồn tích hợp, build, chạy Unit Test cũng như thông báo qua tình trạng hiện tại của dự án qua các kênh giao tiếp khác nhau như mail, Slack, Trello, ... => Dễ dàng truy vết 'hung thủ' làm hư hại code, cũng như các test case failed, etc.

* build:es6 : Compile ES6 to ES5
* build:umd : Convert to UMD (Universal Module Definition) that supports all current version of browsers
* build:umd.min : Minify/Uglify source code

> Run: `npm run build` to run all above commands parallel

### Support CSS Loader

### Examples using data visualization:

1. Chart: 

- https://blog.risingstack.com/node-js-developer-survey-results-2016/

- https://tinhte.vn/threads/tham-hoa-note-7-da-cuon-sach-96-loi-nhuan-mang-mobile-cua-samsung.2654369/

- https://continuousdelivery.com/2014/02/visualizations-of-continuous-delivery/

2. Map: 

- https://www.weforum.org/agenda/2016/10/this-map-shows-where-the-world-s-most-generous-people-live

- http://gs.statcounter.com/#desktop+mobile+tablet-social_media-ww-monthly-201610-201610-map

- https://www.facebook.com/cnn/videos/10155554527471509/

3. Mock Data Server:

- https://www.sitepoint.com/mock-rest-apis-using-json-server/
