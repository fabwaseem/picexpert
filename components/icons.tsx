import * as React from "react";

import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 446 442"
    width={size || width}
    {...props}
  >
    <path
      d="M219.042 52.375C219.042 47.7448 217.202 43.3042 213.928 40.0301C210.654 36.756 206.214 34.9167 201.583 34.9167H118.656C103.608 34.9167 89.176 40.8946 78.5353 51.5353C67.8946 62.1761 61.9167 76.608 61.9167 91.6563V174.583C61.9167 179.214 63.756 183.654 67.0301 186.928C70.3042 190.202 74.7448 192.042 79.375 192.042C84.0052 192.042 88.4458 190.202 91.7199 186.928C94.994 183.654 96.8333 179.214 96.8333 174.583V91.6563C96.8333 79.61 106.61 69.8334 118.656 69.8334H201.583C206.214 69.8334 210.654 67.994 213.928 64.7199C217.202 61.4459 219.042 57.0053 219.042 52.375ZM271.417 34.9167C266.786 34.9167 262.346 36.756 259.072 40.0301C255.798 43.3042 253.958 47.7448 253.958 52.375C253.958 57.0053 255.798 61.4459 259.072 64.7199C262.346 67.994 266.786 69.8334 271.417 69.8334H354.344C366.39 69.8334 376.167 79.61 376.167 91.6563V174.583C376.167 179.214 378.006 183.654 381.28 186.928C384.554 190.202 388.995 192.042 393.625 192.042C398.255 192.042 402.696 190.202 405.97 186.928C409.244 183.654 411.083 179.214 411.083 174.583V91.6563C411.083 84.2051 409.616 76.8269 406.764 69.943C403.913 63.059 399.733 56.8041 394.465 51.5353C389.196 46.2666 382.941 42.0872 376.057 39.2357C369.173 36.3843 361.795 34.9167 354.344 34.9167H271.417ZM271.417 384.083C266.786 384.083 262.346 382.244 259.072 378.97C255.798 375.696 253.958 371.255 253.958 366.625C253.958 361.995 255.798 357.554 259.072 354.28C262.346 351.006 266.786 349.167 271.417 349.167H354.344C366.39 349.167 376.167 339.39 376.167 327.344V244.417C376.167 239.786 378.006 235.346 381.28 232.072C384.554 228.798 388.995 226.958 393.625 226.958C398.255 226.958 402.696 228.798 405.97 232.072C409.244 235.346 411.083 239.786 411.083 244.417V327.344C411.083 334.795 409.616 342.173 406.764 349.057C403.913 355.941 399.733 362.196 394.465 367.465C389.196 372.733 382.941 376.913 376.057 379.764C369.173 382.616 361.795 384.083 354.344 384.083H271.417Z"
      fill="white"
    />
    <path
      d="M254.708 257.946C243.883 250.3 230.709 246.71 217.498 247.809C204.235 248.912 191.789 254.671 182.362 264.066L182.359 264.069L150.904 295.389C146.431 299.9 140.525 302.712 134.201 303.338C127.911 303.96 121.603 302.379 116.35 298.87C110.082 294.822 102.612 293.055 95.1953 293.863C87.8573 294.663 81.0132 297.938 75.7861 303.144L55.1816 327.059C55.1911 329.133 55.3309 331.202 55.5996 333.252L78.7012 306.254L78.9023 306.019L79.1211 305.8C83.6103 301.307 89.5071 298.494 95.8232 297.829L95.9062 297.82L95.9893 297.813C102.233 297.288 108.471 298.874 113.706 302.315H113.707C119.875 306.321 127.219 308.117 134.539 307.408C141.844 306.701 148.694 303.542 153.975 298.446L185.368 267.053C194 258.417 205.395 253.093 217.558 252.014C229.341 250.968 241.117 253.972 250.949 260.509L251.895 261.152L252.062 261.268L252.222 261.393L268.75 274.205V268.916L254.708 257.946ZM108.056 208.35C102.399 208.349 96.9143 210.304 92.5322 213.884C88.135 217.476 85.1194 222.481 84 228.048C82.8807 233.614 83.7273 239.398 86.3945 244.41C89.0618 249.423 93.3849 253.355 98.627 255.536C101.979 256.931 105.6 257.565 109.227 257.392C112.854 257.218 116.398 256.241 119.602 254.532C122.805 252.823 125.59 250.424 127.754 247.509C129.918 244.593 131.409 241.233 132.117 237.672C132.826 234.11 132.735 230.436 131.852 226.914C130.968 223.392 129.313 220.11 127.007 217.305C124.701 214.5 121.801 212.241 118.517 210.692C115.245 209.15 111.672 208.35 108.056 208.35ZM305 327.264C304.961 349.957 295.929 371.71 279.882 387.757C263.835 403.804 242.082 412.836 219.389 412.875H104.611C81.9179 412.836 60.1648 403.804 44.1182 387.757C28.0715 371.71 19.0394 349.957 19 327.264V232.736L19.0088 231.673C19.3238 209.364 28.3223 188.039 44.1182 172.243C60.1648 156.196 81.9179 147.164 104.611 147.125H219.389L220.452 147.134C242.761 147.449 264.086 156.447 279.882 172.243C295.929 188.29 304.961 210.043 305 232.736V327.264Z"
      fill="white"
      stroke="#0D0D0D"
      strokeWidth="16"
    />
    <path
      d="M120.285 232.885C120.285 236.143 118.991 239.268 116.687 241.572C114.383 243.876 111.258 245.17 108 245.17C104.742 245.17 101.617 243.876 99.3132 241.572C97.0093 239.268 95.715 236.143 95.715 232.885C95.715 229.627 97.0093 226.502 99.3132 224.198C101.617 221.894 104.742 220.6 108 220.6C111.258 220.6 114.383 221.894 116.687 224.198C118.991 226.502 120.285 229.627 120.285 232.885Z"
      fill="white"
    />
  </svg>
);
export const LogoDark: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 446 442"
    width={size || width}
    {...props}
  >
    <path
      d="M219.042 52.375C219.042 47.7448 217.202 43.3042 213.928 40.0301C210.654 36.756 206.214 34.9167 201.583 34.9167H118.656C103.608 34.9167 89.1761 40.8946 78.5353 51.5353C67.8946 62.1761 61.9167 76.608 61.9167 91.6563V174.583C61.9167 179.214 63.756 183.654 67.0301 186.928C70.3042 190.202 74.7448 192.042 79.375 192.042C84.0053 192.042 88.4459 190.202 91.7199 186.928C94.994 183.654 96.8334 179.214 96.8334 174.583V91.6563C96.8334 79.61 106.61 69.8334 118.656 69.8334H201.583C206.214 69.8334 210.654 67.994 213.928 64.7199C217.202 61.4459 219.042 57.0053 219.042 52.375ZM271.417 34.9167C266.786 34.9167 262.346 36.756 259.072 40.0301C255.798 43.3042 253.958 47.7448 253.958 52.375C253.958 57.0053 255.798 61.4459 259.072 64.7199C262.346 67.994 266.786 69.8334 271.417 69.8334H354.344C366.39 69.8334 376.167 79.61 376.167 91.6563V174.583C376.167 179.214 378.006 183.654 381.28 186.928C384.554 190.202 388.995 192.042 393.625 192.042C398.255 192.042 402.696 190.202 405.97 186.928C409.244 183.654 411.083 179.214 411.083 174.583V91.6563C411.083 84.2051 409.616 76.8269 406.764 69.943C403.913 63.059 399.733 56.8041 394.465 51.5353C389.196 46.2666 382.941 42.0872 376.057 39.2357C369.173 36.3843 361.795 34.9167 354.344 34.9167H271.417ZM271.417 384.083C266.786 384.083 262.346 382.244 259.072 378.97C255.798 375.696 253.958 371.255 253.958 366.625C253.958 361.995 255.798 357.554 259.072 354.28C262.346 351.006 266.786 349.167 271.417 349.167H354.344C366.39 349.167 376.167 339.39 376.167 327.344V244.417C376.167 239.786 378.006 235.346 381.28 232.072C384.554 228.798 388.995 226.958 393.625 226.958C398.255 226.958 402.696 228.798 405.97 232.072C409.244 235.346 411.083 239.786 411.083 244.417V327.344C411.083 334.795 409.616 342.173 406.764 349.057C403.913 355.941 399.733 362.196 394.465 367.465C389.196 372.733 382.941 376.913 376.057 379.764C369.173 382.616 361.795 384.083 354.344 384.083H271.417Z"
      fill="#0D0D0D"
    />
    <path
      d="M254.708 257.946C243.883 250.3 230.709 246.71 217.498 247.809C204.235 248.912 191.789 254.671 182.362 264.066L182.359 264.069L150.904 295.389C146.431 299.9 140.525 302.712 134.201 303.338C127.911 303.96 121.603 302.379 116.35 298.87C110.082 294.822 102.612 293.055 95.1953 293.863C87.8573 294.663 81.0132 297.938 75.7861 303.144L55.1816 327.059C55.1911 329.133 55.3309 331.202 55.5996 333.252L78.7012 306.254L78.9023 306.019L79.1211 305.8C83.6103 301.307 89.5071 298.494 95.8232 297.829L95.9062 297.82L95.9893 297.813C102.233 297.288 108.471 298.874 113.706 302.315H113.707C119.875 306.321 127.219 308.117 134.539 307.408C141.844 306.701 148.694 303.542 153.975 298.446L185.368 267.053C194 258.417 205.395 253.093 217.558 252.014C229.341 250.968 241.117 253.972 250.949 260.509L251.895 261.152L252.062 261.268L252.222 261.393L268.75 274.205V268.916L254.708 257.946ZM108.056 208.35C102.399 208.349 96.9143 210.304 92.5322 213.884C88.135 217.476 85.1194 222.481 84 228.048C82.8807 233.614 83.7273 239.398 86.3945 244.41C89.0618 249.423 93.3849 253.355 98.627 255.536C101.979 256.931 105.6 257.565 109.227 257.392C112.854 257.218 116.398 256.241 119.602 254.532C122.805 252.823 125.59 250.424 127.754 247.509C129.918 244.593 131.409 241.233 132.117 237.672C132.826 234.11 132.735 230.436 131.852 226.914C130.968 223.392 129.313 220.11 127.007 217.305C124.701 214.5 121.801 212.241 118.517 210.692C115.245 209.15 111.672 208.35 108.056 208.35ZM305 327.264C304.961 349.957 295.929 371.71 279.882 387.757C263.835 403.804 242.082 412.836 219.389 412.875H104.611C81.9179 412.836 60.1648 403.804 44.1182 387.757C28.0715 371.71 19.0394 349.957 19 327.264V232.736L19.0088 231.673C19.3238 209.364 28.3223 188.039 44.1182 172.243C60.1648 156.196 81.9179 147.164 104.611 147.125H219.389L220.452 147.134C242.761 147.449 264.086 156.447 279.882 172.243C295.929 188.29 304.961 210.043 305 232.736V327.264Z"
      fill="#0D0D0D"
      stroke="white"
      strokeWidth="16"
    />
    <path
      d="M120.285 232.885C120.285 236.143 118.991 239.268 116.687 241.572C114.383 243.876 111.258 245.17 108 245.17C104.742 245.17 101.617 243.876 99.3132 241.572C97.0093 239.268 95.715 236.143 95.715 232.885C95.715 229.627 97.0093 226.502 99.3132 224.198C101.617 221.894 104.742 220.6 108 220.6C111.258 220.6 114.383 221.894 116.687 224.198C118.991 226.502 120.285 229.627 120.285 232.885Z"
      fill="#0D0D0D"
    />
  </svg>
);

export const DiscordIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const TwitterIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
        fill="currentColor"
      />
    </svg>
  );
};

export const GithubIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const HeartFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const ArrowRightRoundIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M16.243 22.141a10.606 10.606 0 0 1-4.25.859c-1.498 0-2.91-.286-4.236-.859a11.122 11.122 0 0 1-3.508-2.385 11.364 11.364 0 0 1-2.384-3.517A10.518 10.518 0 0 1 1 12c0-1.5.288-2.912.865-4.24a11.423 11.423 0 0 1 2.377-3.516A11.04 11.04 0 0 1 7.743 1.86 10.572 10.572 0 0 1 11.98 1a10.6 10.6 0 0 1 4.25.859 11.202 11.202 0 0 1 3.514 2.385 11.306 11.306 0 0 1 2.391 3.517C22.712 9.088 23 10.5 23 12s-.288 2.912-.865 4.24a11.364 11.364 0 0 1-2.384 3.516 11.122 11.122 0 0 1-3.508 2.385Zm1.077-9.405c.245-.245.367-.495.367-.75 0-.245-.122-.49-.367-.736l-3.61-3.64c-.164-.163-.382-.244-.654-.244a.886.886 0 0 0-.913.913c0 .245.09.468.272.668l1.172 1.158 1.308 1.05-2.507-.11H7.225a.913.913 0 0 0-.674.267.914.914 0 0 0-.266.674c0 .273.089.498.266.675a.913.913 0 0 0 .674.266h5.163l2.52-.095-1.321 1.05-1.171 1.144a.908.908 0 0 0-.273.668.91.91 0 0 0 .259.661c.172.177.39.266.654.266a.886.886 0 0 0 .654-.26l3.61-3.625Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
export const FeedbackIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="2"
    />
    <path
      d="M7 8H17"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M7 13H13"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
export const AppMenuIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M19 3.32001H16C14.8954 3.32001 14 4.21544 14 5.32001V8.32001C14 9.42458 14.8954 10.32 16 10.32H19C20.1046 10.32 21 9.42458 21 8.32001V5.32001C21 4.21544 20.1046 3.32001 19 3.32001Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M8 3.32001H5C3.89543 3.32001 3 4.21544 3 5.32001V8.32001C3 9.42458 3.89543 10.32 5 10.32H8C9.10457 10.32 10 9.42458 10 8.32001V5.32001C10 4.21544 9.10457 3.32001 8 3.32001Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M19 14.32H16C14.8954 14.32 14 15.2154 14 16.32V19.32C14 20.4246 14.8954 21.32 16 21.32H19C20.1046 21.32 21 20.4246 21 19.32V16.32C21 15.2154 20.1046 14.32 19 14.32Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M8 14.32H5C3.89543 14.32 3 15.2154 3 16.32V19.32C3 20.4246 3.89543 21.32 5 21.32H8C9.10457 21.32 10 20.4246 10 19.32V16.32C10 15.2154 9.10457 14.32 8 14.32Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
export const ChevronDownIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M2 8.539c0-.797.688-1.448 1.543-1.448.421 0 .821.165 1.12.455l7.348 7.031 7.325-7.031a1.65 1.65 0 0 1 1.121-.455c.855 0 1.543.651 1.543 1.448 0 .403-.144.734-.433 1.003l-8.324 7.93c-.366.352-.766.528-1.243.528-.466 0-.866-.165-1.243-.527L2.444 9.542C2.155 9.262 2 8.932 2 8.539z"
      fill="currentColor"
    />
  </svg>
);
export const StarIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M10.1631 2.7372C10.8572 1.12528 13.1427 1.12528 13.8369 2.7372L15.4229 6.42011C15.5677 6.75629 15.8846 6.98651 16.249 7.02031L20.2418 7.39063C21.9893 7.55271 22.6956 9.72633 21.377 10.8846L18.3645 13.5311C18.0895 13.7727 17.9685 14.1452 18.049 14.5023L18.9306 18.414C19.3165 20.1261 17.4675 21.4695 15.9584 20.5734L12.5105 18.5262C12.1958 18.3393 11.8041 18.3393 11.4894 18.5262L8.04154 20.5734C6.53248 21.4695 4.68348 20.1261 5.06936 18.414L5.95099 14.5023C6.03147 14.1452 5.91044 13.7727 5.63545 13.5311L2.62291 10.8846C1.30438 9.72633 2.01063 7.55271 3.75818 7.39063L7.75094 7.02031C8.1154 6.98651 8.43227 6.75629 8.57704 6.42011L10.1631 2.7372ZM13.586 7.21117L12 3.52826L10.4139 7.21117C9.97963 8.21969 9.02902 8.91036 7.93564 9.01176L3.94288 9.38208L6.95542 12.0286C7.78038 12.7533 8.14348 13.8708 7.90205 14.942L7.02042 18.8538L10.4683 16.8065C11.4125 16.2458 12.5875 16.2458 13.5317 16.8065L16.9795 18.8538L16.0979 14.942C15.8565 13.8708 16.2196 12.7533 17.0445 12.0286L20.0571 9.38208L16.0643 9.01176C14.9709 8.91036 14.0203 8.21969 13.586 7.21117Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
export const CropIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M6 3V10.5V14C6 15.8856 6 16.8284 6.58579 17.4142C7.17157 18 8.11438 18 10 18H13.5H21"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M18 21L18 13.5L18 10C18 8.11438 18 7.17157 17.4142 6.58579C16.8284 6 15.8856 6 14 6L10.5 6L3 6"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
export const ExpandIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21 14V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H14M10 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10M15 9L21 3M21 3H15M21 3V9M9 15L3 21M3 21H9M3 21L3 15"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const SystemIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v2h12v-2l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"
      fill="currentColor"
    />
  </svg>
);
export const ImageIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <rect
      height="18"
      rx="2"
      ry="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      width="18"
      x="3"
      y="3"
    />
    <circle
      cx="9"
      cy="9"
      r="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M21 15L17.914 11.914C17.5387 11.5387 16.9303 11.5387 16.555 11.914L6 21"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);
export const PlusRoundIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.97 11.16h3.88c.46 0 .83.37.83.83 0 .46-.38.83-.84.83h-3.89v3.88c0 .46-.38.83-.84.83-.47 0-.84-.38-.84-.84V12.8H7.38c-.47 0-.84-.38-.84-.84 0-.47.37-.84.83-.84h3.88V7.23a.83.83 0 1 1 1.66-.01v3.88ZM5.06 4.92c-3.91 3.9-3.91 10.23 0 14.14 3.9 3.9 10.23 3.9 14.14 0 3.9-3.91 3.9-10.24 0-14.15a10 10 0 0 0-14.15 0Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
export const ExportSettingIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M17.38 13.7c1.71 0 3.11 1.38 3.11 3.09 0 1.7-1.4 3.09-3.12 3.09-1.72 0-3.12-1.39-3.12-3.1 0-1.71 1.39-3.1 3.11-3.1Zm0 1.5c-.89 0-1.62.71-1.62 1.59 0 .88.72 1.59 1.61 1.59.88 0 1.61-.72 1.61-1.6 0-.88-.73-1.6-1.62-1.6Zm-7.31.88a.749.749 0 1 1 0 1.5H3.76c-.42 0-.75-.34-.75-.75 0-.42.33-.75.75-.75h6.3ZM6.1 3.98c1.71 0 3.11 1.39 3.11 3.09s-1.4 3.09-3.12 3.09c-1.72 0-3.12-1.388-3.12-3.1 0-1.71 1.39-3.1 3.11-3.1Zm0 1.5c-.89 0-1.62.71-1.62 1.59 0 .88.72 1.59 1.61 1.59.89 0 1.61-.72 1.61-1.6 0-.89-.73-1.6-1.62-1.6Zm13.07.9a.749.749 0 1 1 0 1.5h-6.3c-.42 0-.75-.34-.75-.75 0-.42.33-.75.75-.75h6.3Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
export const DownloadIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.404 16.49V8.317m3.752 4.408s-2.528 3.764-3.752 3.764c-1.224 0-3.748-3.764-3.748-3.764"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      clipRule="evenodd"
      d="M3.154 12.404c0 6.937 2.313 9.25 9.25 9.25 6.937 0 9.25-2.313 9.25-9.25 0-6.937-2.313-9.25-9.25-9.25-6.937 0-9.25 2.313-9.25 9.25Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);
export const FacebookIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M11.75 19C11.75 19.4142 12.0858 19.75 12.5 19.75C12.9142 19.75 13.25 19.4142 13.25 19H11.75ZM13.25 11C13.25 10.5858 12.9142 10.25 12.5 10.25C12.0858 10.25 11.75 10.5858 11.75 11H13.25ZM15.5 5.75C15.9142 5.75 16.25 5.41421 16.25 5C16.25 4.58579 15.9142 4.25 15.5 4.25V5.75ZM12.5 8H11.75H12.5ZM11.75 11C11.75 11.4142 12.0858 11.75 12.5 11.75C12.9142 11.75 13.25 11.4142 13.25 11H11.75ZM12.5 10.25C12.0858 10.25 11.75 10.5858 11.75 11C11.75 11.4142 12.0858 11.75 12.5 11.75V10.25ZM14.5 11.75C14.9142 11.75 15.25 11.4142 15.25 11C15.25 10.5858 14.9142 10.25 14.5 10.25V11.75ZM12.5 11.75C12.9142 11.75 13.25 11.4142 13.25 11C13.25 10.5858 12.9142 10.25 12.5 10.25V11.75ZM10.5 10.25C10.0858 10.25 9.75 10.5858 9.75 11C9.75 11.4142 10.0858 11.75 10.5 11.75V10.25ZM13.25 19V11H11.75V19H13.25ZM15.5 4.25C13.4289 4.25 11.75 5.92893 11.75 8H13.25C13.25 6.75736 14.2574 5.75 15.5 5.75V4.25ZM11.75 8V11H13.25V8H11.75ZM12.5 11.75H14.5V10.25H12.5V11.75ZM12.5 10.25H10.5V11.75H12.5V10.25Z"
      fill="currentColor"
    />
  </svg>
);
export const InstagramIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M15.5 5H9.5C7.29086 5 5.5 6.79086 5.5 9V15C5.5 17.2091 7.29086 19 9.5 19H15.5C17.7091 19 19.5 17.2091 19.5 15V9C19.5 6.79086 17.7091 5 15.5 5Z"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      clipRule="evenodd"
      d="M12.5 15C10.8431 15 9.5 13.6569 9.5 12C9.5 10.3431 10.8431 9 12.5 9C14.1569 9 15.5 10.3431 15.5 12C15.5 12.7956 15.1839 13.5587 14.6213 14.1213C14.0587 14.6839 13.2956 15 12.5 15Z"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <rect
      fill="currentColor"
      height="2"
      rx="1"
      transform="rotate(-90 15.5 9)"
      width="2"
      x="15.5"
      y="9"
    />
    <rect
      height="1"
      rx="0.5"
      stroke="currentColor"
      strokeLinecap="round"
      transform="rotate(-90 16 8.5)"
      width="1"
      x="16"
      y="8.5"
    />
  </svg>
);
export const LinkedinIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M16.3536 7.64645C16.1583 7.45118 15.8417 7.45118 15.6464 7.64645L11.5 11.7929L9.35355 9.64645C9.15829 9.45118 8.84171 9.45118 8.64645 9.64645C8.45118 9.84171 8.45118 10.1583 8.64645 10.3536L11.1464 12.8536C11.3417 13.0488 11.6583 13.0488 11.8536 12.8536L16.3536 8.35355C16.5488 8.15829 16.5488 7.84171 16.3536 7.64645Z"
      fill="currentColor"
    />
    <path
      d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5ZM18 19H15V13H18V19ZM16.5 11.5C15.6716 11.5 15 10.8284 15 10C15 9.17157 15.6716 8.5 16.5 8.5C17.3284 8.5 18 9.17157 18 10C18 10.8284 17.3284 11.5 16.5 11.5ZM13 19H10V13H13V19ZM8 19H5V10H8V19Z"
      fill="currentColor"
    />
  </svg>
);
export const YoutubeIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M18.168 19.0028C20.4724 19.0867 22.41 17.29 22.5 14.9858V9.01982C22.41 6.71569 20.4724 4.91893 18.168 5.00282H6.832C4.52763 4.91893 2.58998 6.71569 2.5 9.01982V14.9858C2.58998 17.29 4.52763 19.0867 6.832 19.0028H18.168Z"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      clipRule="evenodd"
      d="M12.008 9.17784L15.169 11.3258C15.3738 11.4454 15.4997 11.6647 15.4997 11.9018C15.4997 12.139 15.3738 12.3583 15.169 12.4778L12.008 14.8278C11.408 15.2348 10.5 14.8878 10.5 14.2518V9.75184C10.5 9.11884 11.409 8.77084 12.008 9.17784Z"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);
export const SettingIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M11.19 7.84996C11.6934 7.09341 11.5669 6.0823 10.8926 5.47312C10.2183 4.86394 9.19957 4.8404 8.49785 5.41779C7.79614 5.99517 7.62304 6.99935 8.09096 7.77835C8.55887 8.55735 9.52668 8.87624 10.366 8.52796C10.7014 8.38801 10.9881 8.15215 11.19 7.84996Z"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      clipRule="evenodd"
      d="M11.19 18.165C11.6934 17.4084 11.5669 16.3973 10.8926 15.7881C10.2183 15.1789 9.19957 15.1554 8.49785 15.7328C7.79614 16.3102 7.62304 17.3144 8.09096 18.0934C8.55887 18.8724 9.52668 19.1912 10.366 18.843C10.7014 18.703 10.9881 18.4672 11.19 18.165V18.165Z"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      clipRule="evenodd"
      d="M13.81 13.0069C13.3066 12.2504 13.4331 11.2393 14.1074 10.6301C14.7817 10.0209 15.8004 9.99738 16.5021 10.5748C17.2039 11.1522 17.377 12.1563 16.909 12.9353C16.4411 13.7143 15.4733 14.0332 14.634 13.6849C14.2986 13.545 14.0119 13.3091 13.81 13.0069V13.0069Z"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M11.5 6.07593C11.0858 6.07593 10.75 6.41171 10.75 6.82593C10.75 7.24014 11.0858 7.57593 11.5 7.57593V6.07593ZM19.5 7.57593C19.9142 7.57593 20.25 7.24014 20.25 6.82593C20.25 6.41171 19.9142 6.07593 19.5 6.07593V7.57593ZM7.827 7.57593C8.24121 7.57593 8.577 7.24014 8.577 6.82593C8.577 6.41171 8.24121 6.07593 7.827 6.07593V7.57593ZM5.5 6.07593C5.08579 6.07593 4.75 6.41171 4.75 6.82593C4.75 7.24014 5.08579 7.57593 5.5 7.57593V6.07593ZM11.5 16.3919C11.0858 16.3919 10.75 16.7277 10.75 17.1419C10.75 17.5561 11.0858 17.8919 11.5 17.8919V16.3919ZM19.5 17.8919C19.9142 17.8919 20.25 17.5561 20.25 17.1419C20.25 16.7277 19.9142 16.3919 19.5 16.3919V17.8919ZM7.827 17.8919C8.24121 17.8919 8.577 17.5561 8.577 17.1419C8.577 16.7277 8.24121 16.3919 7.827 16.3919V17.8919ZM5.5 16.3919C5.08579 16.3919 4.75 16.7277 4.75 17.1419C4.75 17.5561 5.08579 17.8919 5.5 17.8919V16.3919ZM13.5 12.7339C13.9142 12.7339 14.25 12.3981 14.25 11.9839C14.25 11.5697 13.9142 11.2339 13.5 11.2339V12.7339ZM5.5 11.2339C5.08579 11.2339 4.75 11.5697 4.75 11.9839C4.75 12.3981 5.08579 12.7339 5.5 12.7339V11.2339ZM17.173 11.2339C16.7588 11.2339 16.423 11.5697 16.423 11.9839C16.423 12.3981 16.7588 12.7339 17.173 12.7339V11.2339ZM19.5 12.7339C19.9142 12.7339 20.25 12.3981 20.25 11.9839C20.25 11.5697 19.9142 11.2339 19.5 11.2339V12.7339ZM11.5 7.57593H19.5V6.07593H11.5V7.57593ZM7.827 6.07593H5.5V7.57593H7.827V6.07593ZM11.5 17.8919H19.5V16.3919H11.5V17.8919ZM7.827 16.3919H5.5V17.8919H7.827V16.3919ZM13.5 11.2339H5.5V12.7339H13.5V11.2339ZM17.173 12.7339H19.5V11.2339H17.173V12.7339Z"
      fill="currentColor"
    />
  </svg>
);
export const CheckCircleIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8.5 12.5L10.5 14.5L15.5 9.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);
export const TrancparencyIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M0 0H3V3H0V0ZM6 3H3V6H0V9H3V12H0V15H3V12H6V15H9V12H12V15H15V12H12V9H15V6H12V3H15V0H12V3H9V0H6V3ZM6 6V3H9V6H6ZM6 9H3V6H6V9ZM9 9V6H12V9H9ZM9 9H6V12H9V9Z"
      fill="#000000"
      fillRule="evenodd"
      opacity=".25"
    />
  </svg>
);

export const BlurIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeDasharray="4 6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="12" fill="currentColor" r="5" />
  </svg>
);

export const CircleIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="12" fill="currentColor" r="5" />
  </svg>
);

export const TextIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M9 7H15"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M9 11H15"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M9 15H13"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const BanIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M5.7 5.7L18.3 18.3"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const OpacityLowIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeDasharray="4 4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const OpacityHighIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <circle cx="12" cy="12" fill="currentColor" r="9" />
  </svg>
);

export const SizeSmallIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <rect fill="currentColor" height="6" rx="1" width="6" x="9" y="9" />
  </svg>
);

export const SizeLargeIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <rect fill="currentColor" height="16" rx="2" width="16" x="4" y="4" />
  </svg>
);

export const ColorIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <circle cx="13.5" cy="6.5" fill="currentColor" r="1.5" />
    <circle cx="17.5" cy="10.5" fill="currentColor" r="1.5" />
    <circle cx="8.5" cy="7.5" fill="currentColor" r="1.5" />
    <circle cx="6.5" cy="12.5" fill="currentColor" r="1.5" />
  </svg>
);
export const SharpIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <rect
      height="18"
      rx="0"
      ry="0"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      width="18"
      x="3"
      y="3"
    />
  </svg>
);

export const CurvedIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <rect
      height="18"
      rx="4"
      ry="4"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      width="18"
      x="3"
      y="3"
    />
  </svg>
);

export const RoundIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <rect
      height="18"
      rx="9"
      ry="9"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      width="18"
      x="3"
      y="3"
    />
  </svg>
);
