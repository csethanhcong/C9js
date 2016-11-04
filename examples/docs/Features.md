# Features:

1. `Custom Event Listener`:

- Track thao tác người dùng trên từng loại đồ thị, qua đó cho phép lập trình viên thu thập thông tin,
cũng như thói quen người dùng để phục vụ các mục đích thống kê.

Ví dụ: Một website thương mại điện tử sử dụng C9js làm công cụ để thể hiện dữ liệu các mặt hàng bán chạy.
Thông qua chức năng này, chủ website có thể biết được xu hướng, hành vi, thói quen người dùng khi họ tương tác
trên một đồ thị. Thông qua đó, đưa ra đánh giá, quyết định chiến lược trong tương lai.

2. `Set Option Stand-alone Function`:


3. `Update Data - Update Chart`:

- Code:
	<script>
	    ...
	    chart.updateData(newData, newDataConfig)
	    ~ newData
	    ~ newDataConfig: { name:, value:, ... }
	</script>