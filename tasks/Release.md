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

### Mocha, Chai, jsdom, Mocha, Karma, istanbul:

REF: http://amzotti.github.io/testing/2015/03/16/what-is-the-difference-between-a-test-runner-testing-framework-assertion-library-and-a-testing-plugin/

> Phân biệt các khái niệm bên dưới

- Mocha | Jamine: Testing framework, cung cấp các suite case (describe)

- Chai: Assertion Library, cung cấp các utilities, functions (asertion, expect, should) giúp viết test-case đơn giản

- jsdom | PhantomJS: Cung cấp headless browser (mock browser)

- Karma: Test runner, cho phép test JS Code trên 'real' browser (Chrome, Firefox, IE, Safari hoặc PhantomJS)

- Istanbul | nyc: Hỗ trợ generate report (nyc support ES6, Istanbul thì không)

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

- http://edition.cnn.com/2016/11/07/asia/india-new-delhi-smog-pollution/index.html?sr=fbCNN110716india-new-delhi-smog-pollution0930AMStoryLink&linkId=30872508

- https://twitter.com/MikeQuindazzi/status/796925182526881793/photo/1


2. Map: 

- https://www.weforum.org/agenda/2016/10/this-map-shows-where-the-world-s-most-generous-people-live

- http://gs.statcounter.com/#desktop+mobile+tablet-social_media-ww-monthly-201610-201610-map

- https://www.facebook.com/cnn/videos/10155554527471509/

- http://tuoitre.vn/tin/interactive/20161101/truc-tuyen-ket-qua-bau-cu-tong-thong-my/1210954.html


3. Mock Data Server:

- https://www.sitepoint.com/mock-rest-apis-using-json-server/


4. So sánh JSDOM vs PhantomJS:

- http://hellote.com/testing-react-components-with-mocha-and-jsdom/

- https://github.com/tmpvar/jsdom/blob/master/README.md

- https://medium.com/podio-engineering-blog/from-karma-to-mocha-with-a-taste-of-jsdom-c9c703a06b21#.23prdcnkm


5. So sánh Mocha, Chai vs Jasmine: 

- http://thejsguy.com/2015/01/12/jasmine-vs-mocha-chai-and-sinon.html


6. Tips:

- Sử dụng package để tránh lỗi Object.assign trong Karma, thêm vào files[] trong karma.conf.js: 
`./node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js`

- Load external library: Trong `karma.conf.js`
files: [
    './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
    'docs/libs/d3/d3.min.js',
    'docs/libs/ol3/ol.js',
    'docs/libs/ol3/ol.css',
    
    // These lines
    {pattern: 'dist/C9.js', included: true},
    {pattern: 'dist/C9.min.css', included: true},
    {pattern: 'test/*.test.js', included: true}
],
