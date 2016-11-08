1. Mô tả bài toán
2. Hướng giải quyết:
	2.1. Quá trình hiện thực
	2.2. Kiến trúc, các thành phần
	2.3. Tính khái quát
3. Kết luận: Hướng phát triển
3.. Ứng dụng:
- Giáo dục: Truy vết trên tương tác
- Giao thông: Tracking
4. Đánh giá

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

