import React from "react";
import CharacterSelect from "../components/CharacterSelect";
import PreparedSpells from "../components/PreparedSpells";
import KnownSpells from "../components/KnownSpells";

const SpellBook = () => {
  // Components: CharacterSelect, PreparedSpells, KnownSpells
  return (
    <div>
      <CharacterSelect />
      <PreparedSpells />
      <KnownSpells />
    </div>
  );
};

export default SpellBook;
