export type ArtworkVariant =
  | "cities"
  | "civic"
  | "climate"
  | "culture"
  | "economy"
  | "energy"
  | "science"
  | "technology"
  | "world";

type ArticleArtworkProps = {
  variant: ArtworkVariant;
};

function WorldArtwork() {
  return (
    <>
      <circle cx="260" cy="60" r="76" fill="#B5E3D6" />
      <circle cx="260" cy="60" r="51" fill="none" stroke="#333333" strokeWidth="2" />
      <path d="M209 60h102M260 9c19 18 29 35 29 51s-10 33-29 51M260 9c-19 18-29 35-29 51s10 33 29 51" fill="none" stroke="#333333" strokeWidth="2" />
      <path d="M0 180 75 104l47 38 63-78 73 116z" fill="#D9A58F" />
      <path d="m78 180 90-100 72 100z" fill="#F3EEDF" />
      <path d="M0 180h320" stroke="#333333" strokeWidth="3" />
    </>
  );
}

function ScienceArtwork() {
  return (
    <>
      <circle cx="248" cy="52" r="25" fill="#D9A58F" />
      <path d="M64 24v51L23 149c-9 16 3 31 21 31h120c18 0 30-15 21-31l-41-74V24" fill="#F3EEDF" stroke="#333333" strokeWidth="3" />
      <path d="M50 118h108" stroke="#333333" strokeWidth="3" />
      <path d="M54 123c34 28 66-20 99 1l27 49H31z" fill="#B5E3D6" />
      <circle cx="94" cy="140" r="8" fill="#333333" />
      <circle cx="128" cy="151" r="5" fill="#D9A58F" />
      <path d="M220 95h75M232 117h52M218 139h80" stroke="#F3EEDF" strokeWidth="8" />
    </>
  );
}

function CitiesArtwork() {
  return (
    <>
      <rect x="25" y="64" width="62" height="116" fill="#F3EEDF" />
      <rect x="99" y="33" width="76" height="147" fill="#B5E3D6" />
      <rect x="187" y="79" width="105" height="101" fill="#D9A58F" />
      <path d="M42 88h28M42 110h28M42 132h28M119 61h36M119 86h36M119 111h36M207 104h65M207 128h65" stroke="#333333" strokeWidth="6" />
      <path d="M0 180h320M218 180v-28h35v28" stroke="#333333" strokeWidth="3" />
      <circle cx="269" cy="42" r="22" fill="#F3EEDF" />
    </>
  );
}

function TechnologyArtwork() {
  return (
    <>
      <rect x="38" y="30" width="244" height="136" rx="12" fill="#F3EEDF" stroke="#333333" strokeWidth="3" />
      <path d="M121 180h78M140 166l-5 14M180 166l5 14" stroke="#333333" strokeWidth="4" />
      <circle cx="160" cy="98" r="42" fill="#B5E3D6" />
      <path d="M160 56v84M118 98h84M130 68l60 60M190 68l-60 60" stroke="#333333" strokeWidth="3" />
      <circle cx="160" cy="98" r="13" fill="#D9A58F" />
      <circle cx="62" cy="52" r="5" fill="#D9A58F" />
      <circle cx="79" cy="52" r="5" fill="#B5E3D6" />
    </>
  );
}

function EnergyArtwork() {
  return (
    <>
      <circle cx="252" cy="47" r="30" fill="#D9A58F" />
      <path d="M58 180V83M58 83l-39 30M58 83l43 22M58 83l-1-51M169 180v-66M169 114l-41 19M169 114l35-32M169 114l4 49" stroke="#333333" strokeWidth="4" />
      <path d="M0 149c54-26 102 13 160-5 57-17 97-3 160 20v16H0z" fill="#B5E3D6" />
      <rect x="230" y="103" width="65" height="48" rx="6" fill="#F3EEDF" stroke="#333333" strokeWidth="3" />
      <path d="m265 112-16 19h13l-7 14 24-23h-14z" fill="#D9A58F" />
    </>
  );
}

function EconomyArtwork() {
  return (
    <>
      <path d="M30 163V91h48v72M100 163V61h48v102M170 163V105h48v58M240 163V34h48v129" fill="#F3EEDF" stroke="#333333" strokeWidth="3" />
      <path d="M0 163h320" stroke="#333333" strokeWidth="4" />
      <path d="m39 118 73-42 76 26 82-51" fill="none" stroke="#B5E3D6" strokeWidth="12" />
      <circle cx="270" cy="51" r="10" fill="#D9A58F" />
      <path d="m249 43 21 8-7 20" fill="none" stroke="#333333" strokeWidth="3" />
    </>
  );
}

function ClimateArtwork() {
  return (
    <>
      <circle cx="247" cy="54" r="34" fill="#D9A58F" />
      <path d="M247 4v20M247 84v20M197 54h20M277 54h20M211 18l14 14M269 76l14 14M283 18l-14 14M225 76l-14 14" stroke="#333333" strokeWidth="3" />
      <path d="M0 180 75 111l45 36 54-77 82 110z" fill="#B5E3D6" />
      <path d="M108 180 198 95l98 85z" fill="#F3EEDF" />
      <path d="M0 168c48-19 89 10 139 0s91-7 181 7v5H0z" fill="#333333" />
      <path d="M46 138c10-18 20-27 30-27s21 9 32 27" fill="none" stroke="#333333" strokeWidth="3" />
    </>
  );
}

function CivicArtwork() {
  return (
    <>
      <path d="m35 73 125-53 125 53z" fill="#B5E3D6" stroke="#333333" strokeWidth="3" />
      <path d="M50 78h220M61 78v76M111 78v76M160 78v76M209 78v76M259 78v76M37 155h246v25H37z" fill="#F3EEDF" stroke="#333333" strokeWidth="3" />
      <circle cx="160" cy="53" r="12" fill="#D9A58F" />
      <path d="M0 180h320" stroke="#333333" strokeWidth="3" />
    </>
  );
}

function CultureArtwork() {
  return (
    <>
      <rect x="31" y="30" width="184" height="133" rx="8" fill="#F3EEDF" stroke="#333333" strokeWidth="3" />
      <circle cx="91" cy="82" r="31" fill="#D9A58F" />
      <path d="m44 151 58-49 37 29 35-40 30 60z" fill="#B5E3D6" />
      <rect x="228" y="57" width="61" height="96" rx="6" fill="#B5E3D6" stroke="#333333" strokeWidth="3" transform="rotate(7 228 57)" />
      <path d="M241 84h37M238 103h37M236 122h28" stroke="#333333" strokeWidth="5" />
      <path d="M0 180h320" stroke="#333333" strokeWidth="3" />
    </>
  );
}

export function ArticleArtwork({ variant }: ArticleArtworkProps) {
  return (
    <svg
      viewBox="0 0 320 180"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="320" height="180" fill="#333333" />
      {variant === "world" ? <WorldArtwork /> : null}
      {variant === "science" ? <ScienceArtwork /> : null}
      {variant === "cities" ? <CitiesArtwork /> : null}
      {variant === "technology" ? <TechnologyArtwork /> : null}
      {variant === "energy" ? <EnergyArtwork /> : null}
      {variant === "economy" ? <EconomyArtwork /> : null}
      {variant === "climate" ? <ClimateArtwork /> : null}
      {variant === "civic" ? <CivicArtwork /> : null}
      {variant === "culture" ? <CultureArtwork /> : null}
    </svg>
  );
}
