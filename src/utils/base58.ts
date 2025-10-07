/**
 * Base58 编码/解码工具
 * 提供Base58编码和解码功能
 */

// Base58 字符集
const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const BASE = ALPHABET.length;

/**
 * 将字符串编码为Base58格式
 * @param input 要编码的字符串
 * @returns Base58编码后的字符串
 */
export function base58Encode(input: string): string {
  // 如果输入为空，直接返回空字符串
  if (!input || input.length === 0) {
    return '';
  }

  // 将字符串转换为Uint8Array
  const bytes = new TextEncoder().encode(input);

  // 计算前导零的数量
  let leadingZeros = 0;
  while (leadingZeros < bytes.length && bytes[leadingZeros] === 0) {
    leadingZeros++;
  }

  // 创建结果数组
  const output = new Array(bytes.length * 2); // 预分配足够的空间
  let outputIndex = output.length;

  // 执行Base58编码
  let startAt = leadingZeros;
  while (startAt < bytes.length) {
    let carry = bytes[startAt];
    let i = output.length - 1;
    while (carry || i >= outputIndex) {
      carry += 256 * (output[i] || 0);
      output[i] = carry % BASE;
      carry = Math.floor(carry / BASE);
      i--;
    }
    outputIndex = i + 1;
    startAt++;
  }

  // 生成最终结果字符串
  let result = '';
  // 添加前导零对应的字符
  for (let i = 0; i < leadingZeros; i++) {
    result += ALPHABET[0];
  }
  // 添加其余字符
  for (let i = outputIndex; i < output.length; i++) {
    result += ALPHABET[output[i]!];
  }

  return result;
}

/**
 * 将Base58格式的字符串解码为原始字符串
 * @param input Base58编码的字符串
 * @returns 解码后的原始字符串
 */
export function base58Decode(input: string): string {
  // 如果输入为空，直接返回空字符串
  if (!input || input.length === 0) {
    return '';
  }

  // 计算前导零的数量
  let leadingZeros = 0;
  while (leadingZeros < input.length && input[leadingZeros] === ALPHABET[0]) {
    leadingZeros++;
  }

  // 创建结果数组
  const output = new Uint8Array(input.length);
  let outputIndex = leadingZeros;

  // 执行Base58解码
  for (let i = leadingZeros; i < input.length; i++) {
    let value = ALPHABET.indexOf(input[i]);
    if (value < 0) {
      throw new Error(`Invalid character in Base58 string: ${input[i]}`);
    }

    let carry = value;
    let j = output.length - 1;
    while (carry || j >= outputIndex) {
      carry += BASE * (output[j] || 0);
      output[j] = carry % 256;
      carry = Math.floor(carry / 256);
      j--;
    }
    outputIndex = j + 1;
  }

  // 截取有效部分并转换为字符串
  const resultBytes = output.slice(outputIndex);
  return new TextDecoder().decode(resultBytes);
}