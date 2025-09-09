// src/components/profile/ProfileInfoCard.tsx
import React, { useEffect, useState } from "react";

export type ProfileInfo = {
  fullName: string;
  username: string;
  email: string;
  password?: string;
  age?: number;
  gender?: string;
  location?: string;
  address?: string;
  phone?: string;
  joined?: string;
};

type Props = {
  bgColor: string;
  /** Geef óf 'info' mee (direct renderen), óf 'userId' (fetch via API). */
  info?: ProfileInfo;
  userId?: number;
};

export default function ProfileInfoCard({ bgColor, info, userId }: Props) {
  const [data, setData] = useState<ProfileInfo | null>(info ?? null);
  const [loading, setLoading] = useState<boolean>(!!userId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    // Als een userId is opgegeven, data ophalen via API.
    if (typeof userId === "number") {
      (async () => {
        try {
          setLoading(true);
          setError(null);
          const res = await fetch(`/api/users/${userId}`, {
            credentials: "include",
          });
          if (!res.ok) throw new Error("Kon profiel niet laden");
          const json = await res.json();

          if (!active) return;

          const mapped: ProfileInfo = {
            fullName:
              (json.name && json.lastName
                ? `${json.name} ${json.lastName}`
                : json.name || json.username) ?? "Onbekend",
            username: json.username ?? "",
            email: json.email ?? "",
            age: isNum(json.age) ? Number(json.age) : undefined,
            gender: strOrUndef(json.gender),
            location: strOrUndef(json.location),
            address: strOrUndef(json.address),
            phone: strOrUndef(json.phone),
            joined: strOrUndef(json.joined),
          };

          setData(mapped);
        } catch (e: any) {
          setError(e?.message || "Onbekende fout");
        } finally {
          if (active) setLoading(false);
        }
      })();
    } else {
      // Geen fetch-modus: render meegegeven info (of leeg)
      setData(info ?? null);
      setLoading(false);
      setError(null);
    }

    return () => {
      active = false;
    };
  }, [userId, info]);

  const headerBg = bgColor || "#2b6cb0";

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="px-5 py-4" style={{ backgroundColor: headerBg }}>
        <h2 className="text-lg font-semibold text-white">Profiel</h2>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="py-8 text-center text-sm text-gray-500">Laden…</div>
        ) : error ? (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>
        ) : data ? (
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Item label="Volledige naam" value={data.fullName} />
            <Item label="Username" value={data.username} />
            <Item label="Email" value={data.email} />
            <Item label="Leeftijd" value={fmtNum(data.age)} />
            <Item label="Geslacht" value={data.gender} />
            <Item label="Locatie" value={data.location} />
            <Item label="Adres" value={data.address} />
            <Item label="Telefoon" value={data.phone} />
            <Item label="Lid sinds" value={data.joined} />
          </dl>
        ) : (
          <div className="py-8 text-center text-sm text-gray-500">Geen profielgegevens.</div>
        )}
      </div>
    </div>
  );
}

function Item({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="rounded-xl border p-3">
      <dt className="text-xs font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value ?? "—"}</dd>
    </div>
  );
}

function isNum(v: unknown): v is number | string {
  return typeof v === "number" || (typeof v === "string" && v.trim() !== "" && !isNaN(Number(v)));
}
function strOrUndef(v: any): string | undefined {
  const s = typeof v === "string" ? v.trim() : "";
  return s ? s : undefined;
}
function fmtNum(n?: number) {
  return typeof n === "number" && !Number.isNaN(n) ? String(n) : undefined;
}
