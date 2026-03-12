const form = document.getElementById("orderForm")

const product = document.getElementById("product")
const quantity = document.getElementById("quantity")
const date = document.getElementById("date")
const address = document.getElementById("address")
const note = document.getElementById("note")

const charCount = document.getElementById("charCount")
const totalPrice = document.getElementById("totalPrice")

const confirmBox = document.getElementById("confirmBox")
const success = document.getElementById("success")

const prices = {
    "Áo": 150000,
    "Quần": 200000,
    "Giày": 500000
}

function showError(id, msg) {
    document.getElementById(id + "Error").textContent = msg
}

function clearError(id) {
    document.getElementById(id + "Error").textContent = ""
}

function validateProduct() {

    if (product.value === "") {
        showError("product", "Phải chọn sản phẩm")
        return false
    }

    clearError("product")
    return true
}

function validateQuantity() {

    const q = Number(quantity.value)

    if (!Number.isInteger(q) || q < 1 || q > 99) {
        showError("quantity", "Số lượng 1-99")
        return false
    }

    clearError("quantity")
    return true
}

function validateDate() {

    const d = new Date(date.value)
    const today = new Date()

    const max = new Date()
    max.setDate(today.getDate() + 30)

    if (date.value === "") {
        showError("date", "Chọn ngày giao")
        return false
    }

    if (d < today) {
        showError("date", "Không được chọn ngày quá khứ")
        return false
    }

    if (d > max) {
        showError("date", "Không quá 30 ngày")
        return false
    }

    clearError("date")
    return true
}

function validateAddress() {

    if (address.value.trim().length < 10) {
        showError("address", "Ít nhất 10 ký tự")
        return false
    }

    clearError("address")
    return true
}

function validateNote() {

    if (note.value.length > 200) {
        showError("note", "Tối đa 200 ký tự")
        return false
    }

    clearError("note")
    return true
}

function validatePay() {

    const pay = document.querySelector("input[name='pay']:checked")

    if (!pay) {
        showError("pay", "Chọn phương thức thanh toán")
        return false
    }

    clearError("pay")
    return true
}

function updateTotal() {

    const p = product.value
    const q = Number(quantity.value)

    if (prices[p] && q) {
        let total = prices[p] * q
        totalPrice.textContent = total.toLocaleString("vi-VN")
    }

}

product.addEventListener("change", updateTotal)
quantity.addEventListener("input", updateTotal)

note.addEventListener("input", function () {

    let len = note.value.length

    charCount.textContent = len + "/200"

    if (len > 200) {
        charCount.style.color = "red"
    } else {
        charCount.style.color = "black"
    }

})

form.addEventListener("submit", function (e) {

    e.preventDefault()

    const valid =
        validateProduct() &
        validateQuantity() &
        validateDate() &
        validateAddress() &
        validateNote() &
        validatePay()

    if (!valid) return

    let total = prices[product.value] * Number(quantity.value)

    confirmBox.innerHTML = `
<div class="confirm">
<p>Sản phẩm: ${product.value}</p>
<p>Số lượng: ${quantity.value}</p>
<p>Tổng tiền: ${total.toLocaleString("vi-VN")} VNĐ</p>
<p>Ngày giao: ${date.value}</p>

<button id="ok">Xác nhận</button>
<button id="cancel">Hủy</button>
</div>
`

    document.getElementById("ok").onclick = function () {

        form.style.display = "none"

        confirmBox.style.display = "none"

        success.innerHTML =
            `<div class="success">
Đặt hàng thành công 🎉
</div>`

    }

    document.getElementById("cancel").onclick = function () {

        confirmBox.innerHTML = ""

    }

})

