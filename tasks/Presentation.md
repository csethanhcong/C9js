1. Giới thiệu:
	1.1. Bối cảnh:
		- Ngữ cảnh đề tài
		- Ứng dụng web
		- Trực quan hoá dữ liệu
	1.2. Lý do chọn đề tài
	1.3. Mục tiêu (luận văn)
		- Rút ngắn thời gian cho các dev
		- Không cần tìm hiểu nhiều loại thư viện khác nhau

2. Kiến thức nền & Công nghệ:
	2.1. Công trình liên quan
	2.2. Kiến thức nền tảng: 
		2.2.1. JS (new features ES6)
		2.2.2. d3
		2.2.3. OL
		2.2.4. Repository Management (GitHub)
		2.2.4. Module Loader (Webpack)
		2.2.5. Unit Testing (Mocha, Chai)
		2.2.6. Version Control (Semantic-release)
		2.2.7. Code Coverage (codecov.io)
		2.2.8. Continuous Integration & Continuous Delivery (CI & CD) - TravisCI
		...

3. Giới thiệu thư viện C9js:
	3.1. Mô tả bài toán
	3.2. Hướng dẫn sử dụng
	3.3. Các ví dụ minh hoạ
	3.4. Ứng dụng thực tế

4. Quá trình thực hiện:
	4.1. Kiến trúc xây dựng (Componentize & Data-driven) <trích code>
	4.2. Hiện thực thư viện:
		<Đoạn dẫn>
		4.2.1. Coding
		4.2.2. Testing
		4.2.3. Release

5. Kết luận:
	5.1. Đánh giá:
		5.1.1. Phương pháp đánh giá: Feedback, issue, user
			- So sánh LoC
			- SVG <> Canvas
		5.1.2. Kết quả:
	5.2. Hướng phát triển
	5.3. Kết luận

6. Tài liệu tham khảo

2.2. Luồng xử lý:

	var bChart = new BarChart	
	-> super.constructor -> super.updateConfig 
	|-> BarChart constructor -> updateConfig

	bChart.setOption 			
	-> super.setOption -> super.updateConfig 
	|-> setOption -> updateConfig

	bChart.draw 				-> super.draw -> draw

	bChart.updateData(newData [, newDataConfig])
	-> updateDataConfig

