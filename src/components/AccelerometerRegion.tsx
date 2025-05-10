import { useAccelerometer } from "../hooks/useAccelerometer";

const AccelerometerRegion = () => {
    const { x, y, z } = useAccelerometer();

    const data = [
        { label: "X", value: x },
        { label: "Y", value: y },
        { label: "Z", value: z },
    ];

    return (
        <div className="bg-white p-4 rounded-xl shadow-md flex flex-row sm:flex-row items-center justify-center gap-4">
            {data.map(({ label, value }) => (
                <div
                    key={label}
                    className="bg-gray-100 px-6 py-3 rounded-lg text-center shadow-sm"
                >
                    <span className="text-sm text-gray-500 block mb-1">
                        Valor de {label}:
                    </span>
                    <span className="text-xl font-semibold text-gray-800">
                        {value.toFixed(2)}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default AccelerometerRegion;
