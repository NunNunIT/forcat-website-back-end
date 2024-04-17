function parseNumToCurrencyStr(price: number): string {
  return price.toLocaleString("vi-VN");
}

function cleanDateFormatInput(inputDate: string): string {
  // Use regular expression to remove unwanted characters
  return inputDate.replace(/[^\d/]/g, "");
}

function convertDateFormatYMD(inputDate: string): string {
  // Use cleanDateFormatInput function to remove unwanted characters
  var cleanedDate = cleanDateFormatInput(inputDate);

  // Convert date format to "yyyy-MM-dd" before assigning to input
  var parts = cleanedDate.split("/");

  var result = parts[2] + "-" + parts[1] + "-" + parts[0];

  return result;
}

function convertDateFormat(inputDate: string): string {
  if (!inputDate) {
    return "";
  }
  var parts = inputDate.split("-");
  return parts[2] + "/" + parts[1] + "/" + parts[0];
}

function convertOrderStatusToStr(order_status: string): string {
  switch (order_status.toLowerCase()) {
    case "all":
      return "Tất cả";
    case "unpaid":
      return "Chờ thanh toán";
    case "delivering":
      return "Đang giao";
    case "finished":
      return "Hoàn thành";
    case "cancel":
      return "Đã hủy";
  }

  console.log("Unexpected Order Status: ", order_status);
  return "Unexpected Order Status";
}

function isActiveClass(src_str: string, des_str: string): string {
  const min_length = Math.min(src_str.length, des_str.length);
  return src_str.substring(0, min_length) === des_str.substring(0, min_length) ? "is-active" : "";
}

function isActiveClassWithBool(bool: boolean): string {
  return bool ? "is-active" : "";
}

function convertDateStrToDDMMYYYY(dateStr: string): string {
  return dateStr.split("-").reverse().join("/");
}

function convertDateToFormatHHMMDDMMYYYY(date: Date): string {
  const locales = "vi-VN";
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return `${date.toLocaleTimeString(locales, timeOptions)} ${date.toLocaleDateString(locales, dateOptions)}`;
}

function convertPaymentToStr(payment_type: string): string {
  switch (payment_type.toLowerCase()) {
    case "credit_card":
      return "thẻ tín dụng";
  }

  return "Unexpected Payment Type";
}

function convertOrderStatusToIconData(order_status: string): string {
  switch (order_status.toLowerCase()) {
    case "unpaid":
      return "payment";
    case "delivering":
      return "local_shipping";
    case "finished":
      return "done_all";
    case "cancel":
      return "cancel";
  }
  return "Unexpected Order Status";
}

function convertMoneyToNumber(money: string): number {
  return Number(
    money.replaceAll("đ", "").replaceAll(".", "").replaceAll("&nbsp;", "")
  );
}

function convertNumberToMoney(number: number): string {
  // Check if the provided number is valid
  if (isNaN(number)) {
    return "Invalid number";
  }

  // Format the number as currency using toLocaleString
  const currency = number
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace(/₫/g, "");

  // Return the formatted currency string
  return currency;
}

function convertDateToHourDayMonthYear(dateString: string): string {
  const date = new Date(dateString);

  const hours: string = ("0" + date.getUTCHours()).slice(-2);
  const minutes: string = ("0" + date.getUTCMinutes()).slice(-2);

  const day: string = ("0" + date.getUTCDate()).slice(-2);
  const month: string = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const year: number = date.getUTCFullYear();

  return `${hours}:${minutes} - ${day}/${month}/${year}`;
}

function isValidEmail(email: string): boolean {
  // Regex pattern để kiểm tra định dạng email
  const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Kiểm tra xem email có phù hợp với định dạng không
  return emailPattern.test(email);
}

function createSlug(string: string) {
  const a =
    "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;";
  const b =
    "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");
  return string
    .toString()
    .toLowerCase()
    .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a")
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e")
    .replace(/i|í|ì|ỉ|ĩ|ị/gi, "i")
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o")
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u")
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y")
    .replace(/đ/gi, "d")
    .replace(/\s+/g, "-")
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

function objectToSearchParams(obj: Object) {
  const searchParams = new URLSearchParams();

  // Loop through each key-value pair in the object
  for (const [key, value] of Object.entries(obj)) {
    // If value is an array, append each element as a separate parameter
    if (Array.isArray(value)) {
      value.forEach(item => searchParams.append(key, item));
    } else {
      // Otherwise, append the key-value pair directly
      searchParams.append(key, value);
    }
  }

  return searchParams;
}


export {
  parseNumToCurrencyStr,
  cleanDateFormatInput,
  convertDateFormatYMD,
  convertDateFormat,
  convertMoneyToNumber,
  convertNumberToMoney,
  convertDateToHourDayMonthYear,
  isValidEmail,
  convertOrderStatusToStr,
  isActiveClass,
  convertDateToFormatHHMMDDMMYYYY,
  convertDateStrToDDMMYYYY,
  convertPaymentToStr,
  convertOrderStatusToIconData,
  isActiveClassWithBool,
  createSlug,
  objectToSearchParams,
};
