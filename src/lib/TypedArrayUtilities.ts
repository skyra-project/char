export function endianness(): 'BE' | 'LE' {
	const a = new ArrayBuffer(2);
	const b = new Uint8Array(a);
	const c = new Uint16Array(a);
	b[0] = 1;
	b[1] = 2;
	if (c[0] === 258) return 'BE';
	if (c[0] === 513) return 'LE';

	throw new Error('unable to figure out endianess');
}

const bigEndian = endianness() === 'BE';
const float64Array = new Float64Array(1);
const uInt8Float64Array = new Uint8Array(float64Array.buffer);

export function readUInt8(array: Uint8Array, offset: number) {
	return array[offset];
}

export function readInt8(array: Uint8Array, offset: number) {
	const value = array[offset];
	return value | ((value & (2 ** 7)) * 0x1fffffe);
}

export function readUInt16LE(array: Uint8Array, offset: number) {
	return array[offset] | (array[offset + 1] << 8);
}

function readDoubleBackwards(array: Uint8Array, offset: number) {
	uInt8Float64Array[7] = array[offset];
	uInt8Float64Array[6] = array[offset + 1];
	uInt8Float64Array[5] = array[offset + 2];
	uInt8Float64Array[4] = array[offset + 3];
	uInt8Float64Array[3] = array[offset + 4];
	uInt8Float64Array[2] = array[offset + 5];
	uInt8Float64Array[1] = array[offset + 6];
	uInt8Float64Array[0] = array[offset + 7];
	return float64Array[0];
}

function readDoubleForwards(array: Uint8Array, offset: number) {
	uInt8Float64Array[0] = array[offset];
	uInt8Float64Array[1] = array[offset + 1];
	uInt8Float64Array[2] = array[offset + 2];
	uInt8Float64Array[3] = array[offset + 3];
	uInt8Float64Array[4] = array[offset + 4];
	uInt8Float64Array[5] = array[offset + 5];
	uInt8Float64Array[6] = array[offset + 6];
	uInt8Float64Array[7] = array[offset + 7];
	return float64Array[0];
}

export const readDoubleLE = bigEndian ? readDoubleBackwards : readDoubleForwards;
