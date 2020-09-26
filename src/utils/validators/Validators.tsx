import React from 'react';

export const requiredField = (value: number) => {
        if (value) {return undefined}
        return "Field is required"

}

export const naxLength = (maxLength: number) => (value: string) => {
    if(value && value.length > maxLength ) {return `Max length is ${maxLength} symbols`}
}
