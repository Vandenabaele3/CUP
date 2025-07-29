    import React from "react";
    import ListWidget from "../components/widgets/ListWidget";

    const mockData = Array.from({ length: 60 }).map((_, i) => ({
    id: `${i + 1}`,
    text: `Game ${i + 1}`,
    created: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
    status: i % 2 === 0 ? "Actief" : "Inactief",
    }));

    const Games: React.FC = () => {
    const bgColor = "#2d8b99"; // Gebruik bannerkleur als achtergrond

    return (
        <div className="px-0 pt-6 pb-10">
        <div className="w-full max-w-[1400px] mx-auto">
            <div
            className="p-[5px] rounded-xl border border-white/10 mx-0"
            style={{
                backgroundColor: bgColor,
                width: "100%",
            }}
            >
            <ListWidget initialItems={mockData} itemsPerPage={15} />
            </div>
        </div>
        </div>
    );
    };

    export default Games;
