export default function PlusIcon({className = "", fill = "currentColor"}) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            fill={fill}
            viewBox="3.5 3.5 17 17">

            <path d="M5 12H19" stroke={fill} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>

            <path d="M12 5L12 19" stroke={fill} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}
