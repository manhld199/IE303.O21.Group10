"use client";

// import libs
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

// import components
import { OrderProduct } from "./components";

// import utils
import { convertNumberToMoney, createSlug } from "@/utils";
import { BACKEND_URL, ORDER_STATUS_LIST } from "@/utils/commonConst";

// import css
import "./page.css";

// handle change page
const handleOrderChangPage = () => {
  localStorage.removeItem("buyItems");
};

let buyInfo = [],
  totalWithDiscount,
  totalWithoutDiscount;

export default function OrderInformationPage() {
  const router = useRouter();
  useEffect(() => {
    const buyItems = JSON.parse(localStorage.getItem("buyItems"));
    if (buyItems) {
      buyInfo = buyItems.payload;
      totalWithDiscount = buyInfo.reduce(
        (result, item) => result + item.unit_price * item.quantity,
        0
      );
      totalWithoutDiscount = buyInfo.reduce(
        (result, item) =>
          result +
          item.unit_price *
            ((100 + item.discount_amount) / 100) *
            item.quantity,
        0
      );
    } else {
      return notFound();
    }

    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", handleOrderChangPage);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleOrderChangPage);
      });
    };
  }, []);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [street, setStreet] = useState("");
  const [note, setNote] = useState("");

  // Kiểm tra định dạng họ và tên
  function validateName(event) {
    const vietnameseRegex =
      /^[a-zA-ZđĐáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ\s]*$/g;
    const nameInput = event.currentTarget;
    const errorSpan = nameInput.nextElementSibling;

    if (!vietnameseRegex.test(nameInput.value)) {
      errorSpan.textContent =
        "Họ và tên chỉ bao gồm chữ hoa, chữ thường và dấu cách!";
      errorSpan.style.display = "block";
      setIsNameValid(false);
    } else {
      errorSpan.style.display = "none";
      setIsNameValid(true);
    }

    if (nameInput.value === "") {
      errorSpan.textContent = "Vui lòng điền họ và tên người nhận hàng!";
      errorSpan.style.display = "block";
    }

    setUserName(nameInput.value);
  }

  // Kiểm tra định dạng số điện thoại Việt Nam
  function validatePhoneNumber(event) {
    const vnPhoneNumberRegex =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    const phoneNumberInput = event.currentTarget;
    const errorSpan = phoneNumberInput.nextElementSibling;

    if (!vnPhoneNumberRegex.test(phoneNumberInput.value)) {
      errorSpan.textContent = "Số điện thoại không hợp lệ!";
      errorSpan.style.display = "block";
      setIsPhoneNumberValid(false);
    } else {
      errorSpan.style.display = "none";
      setIsPhoneNumberValid(true);
    }

    if (phoneNumberInput.value === "") {
      errorSpan.style.display = "block";
      errorSpan.textContent = "Vui lòng điền số điện thoại người nhận hàng!";
    }

    setUserPhone(phoneNumberInput.value);
  }

  useEffect(() => {
    // Fetch data
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  function handleCityChange(event) {
    const selectedCityId = event.target.value;
    const selectedCity = cities.find((city) => city.Id === selectedCityId);
    setCity(selectedCity.Name);

    if (selectedCity) {
      setDistricts(selectedCity.Districts);
      setWards([]);
    } else {
      setDistricts([]);
      setWards([]);
    }
  }

  function handleDistrictChange(event) {
    const selectedDistrictId = event.target.value;
    const selectedDistrict = districts.find(
      (district) => district.Id === selectedDistrictId
    );
    setDistrict(selectedDistrict.Name);

    if (selectedDistrict) {
      setWards(selectedDistrict.Wards);
    } else {
      setWards([]);
    }
  }

  function handleWardChange(event) {
    const selectedWardId = event.target.value;
    const selectedWard = wards.find((ward) => ward.Id === selectedWardId);
    setWard(selectedWard.Name);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(buyInfo);

    const orderDetails = buyInfo.map((product) => ({
      product_id: product.product_id,
      product_name: product.product_name,
      product_slug: createSlug(product.product_name),
      product_img: {
        url: product.variant_image_link,
        alt: product.variant_image_alt,
      },
      variant_id: product.variant_id,
      variant_name: product.variant_name,
      variant_slug: createSlug(product.variant_name),
      quantity: product.quantity,
      unit_price: product.unit_price,
    }));

    const orderDto = {
      order_note: note,
      order_buyer: {
        order_name: userName,
        order_phone: userPhone,
        order_address: {
          street: street,
          ward: ward,
          district: district,
          province: city,
        },
      },
      order_details: orderDetails,
      order_total_cost: totalWithDiscount,
    };

    // Log JSON to console
    // console.log(JSON.stringify(orderDto, null, 2));

    try {
      const response = await fetch(`${BACKEND_URL}/orders/createOrder`, {
        method: "POST",
        body: JSON.stringify(orderDto),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        // alert("Đơn hàng đã tạo thành công");
        router.replace(`/order-lookup?phone=${userPhone}`);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <>
      <div className="order__product--mobile">
        {(buyInfo ?? []).map((item, index) => {
          return <OrderProduct buyInfo={item} key={index} />;
        })}
      </div>
      <form id="order-form" onSubmit={handleSubmit}>
        <section className="order-detail">
          <div className="order-detail__customer">
            <h2>Thông tin người nhận hàng</h2>
            <div>
              <div className="order-detail__input">
                <input
                  name="buyerName"
                  value={userName}
                  onChange={validateName}
                  type="text"
                  placeholder="Họ và tên"
                  required
                />
                <p className="error"></p>
              </div>
              <div className="order-detail__input">
                <input
                  name="buyerPhone"
                  value={userPhone}
                  onChange={validatePhoneNumber}
                  type="text"
                  placeholder="Số điện thoại"
                  required
                />
                <p className="error"></p>
              </div>
            </div>
          </div>

          <div className="order-detail__location location">
            <h2>Địa chỉ nhận hàng</h2>
            <div className="location__input-group">
              <select
                className="location__select"
                id="city"
                required
                onChange={handleCityChange}>
                <option value="" selected>
                  Chọn Tỉnh/Thành phố
                </option>
                {(cities ?? []).map((city) => (
                  <option key={city.Id} value={city.Id}>
                    {city.Name}
                  </option>
                ))}
              </select>

              <select
                className="location__select"
                id="district"
                required
                onChange={handleDistrictChange}>
                <option value="" selected>
                  Chọn Quận/Huyện
                </option>
                {(districts ?? []).map((district) => (
                  <option key={district.Id} value={district.Id}>
                    {district.Name}
                  </option>
                ))}
              </select>

              <select
                className="location__select"
                id="ward"
                required
                onChange={handleWardChange}>
                <option value="" selected>
                  Chọn Phường/Xã
                </option>
                {(wards ?? []).map((ward) => (
                  <option key={ward.Id} value={ward.Id}>
                    {ward.Name}
                  </option>
                ))}
              </select>

              <input
                name="address"
                type="text"
                placeholder="Số nhà, tên đường..."
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="order-detail__note note">
            <h2>Yêu cầu kèm theo</h2>
            <textarea
              className="note__text-area"
              name="note"
              placeholder="Hãy nhập yêu cầu kèm theo (tùy chọn)..."
              onChange={(e) => setNote(e.target.value)}
              value={note}></textarea>
          </div>

          <div className="order-detail__pay-method pay-method">
            <h2>Phương thức thanh toán</h2>
            <div className="pay-method__choose">
              Thanh toán trực tiếp khi nhận hàng
            </div>
          </div>
        </section>
      </form>

      <section className="order-sidebar">
        <div className="order-sidebar__product">
          {(buyInfo ?? []).map((item, index) => {
            return <OrderProduct buyInfo={item} key={index} />;
          })}
        </div>
        <div className="order-pay__coupon">
          <input
            name="address"
            type="text"
            placeholder="Mã khuyến mãi"
            required
          />
          <div id="order-pay__coupon-submit">Sử dụng</div>
        </div>
        <hr />
        <div className="order-pay">
          <div className="order-pay__price">
            <div className="order-pay__price-container">
              <div>
                {totalWithDiscount != totalWithoutDiscount && (
                  <del className="order-pay__total-del">
                    {convertNumberToMoney(totalWithoutDiscount)}
                  </del>
                )}
              </div>
              <div className="order-pay__price__main">
                <p>Tổng tiền hàng</p>
                <p className="order-pay__total">
                  {convertNumberToMoney(totalWithDiscount)}
                </p>
              </div>
            </div>
          </div>

          <div className="order-pay__submit">
            <p>
              Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý tuân theo
              <Link href="/privacy-policy">
                {" "}
                Điều khoản đặt hàng của Forcat.
              </Link>
            </p>
            <button id="order-form-submit" type="submit" form="order-form">
              Đặt hàng
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
