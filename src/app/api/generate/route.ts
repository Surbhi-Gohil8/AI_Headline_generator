import { NextRequest, NextResponse } from 'next/server';

// Helper to capitalize first letter
const capitalize = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || "";

// Helper to join with a specific separator if all parts exist
const joinIfAll = (parts: (string | undefined)[], separator: string = ' | '): string => {
  const validParts = parts.filter(p => p && p.trim() !== '');
  return validParts.length > 0 ? validParts.join(separator) : '';
};

export async function POST(req: NextRequest) {
  const {
    role: rawRole,
    skills: rawSkills,
    goal: rawGoal,
    tone: rawTone,
  } = await req.json();

  const role = capitalize(rawRole?.trim());
  const skills = rawSkills?.trim();
  const goal = rawGoal?.trim();
  const tone = rawTone || 'Professional'; // Default tone

  const generatedHeadlines: string[] = [];

  // Template 1: Classic
  if (role && skills && goal) {
    generatedHeadlines.push(`${role} | ${skills} | ${goal}`);
  } else if (role && skills) {
    generatedHeadlines.push(`${role} | ${skills}`);
  } else if (role && goal) {
    generatedHeadlines.push(`${role} | ${goal}`);
  }


  // Template 2: Role with specialization and focus
  if (role && skills && goal) {
    generatedHeadlines.push(`${role} specializing in ${skills} - Focused on ${goal}`);
  }

  // Template 3: Goal-oriented
  if (goal && role && skills) {
    generatedHeadlines.push(`Driving ${goal} as a ${role} with expertise in ${skills}`);
  } else if (goal && role) {
    generatedHeadlines.push(`Focused on ${goal} as a ${role}`);
  }

  // Template 4: Skills-first
  if (skills && role && goal) {
    generatedHeadlines.push(`${skills} Expert | ${role} | ${goal}`);
  } else if (skills && role) {
    generatedHeadlines.push(`${skills} Expert | ${role}`);
  }

  // Template 5: Passionate Role
  if (role) {
    let passionPrefix = "Passionate ";
    if (goal) passionPrefix += `${goal}-driven `;
    generatedHeadlines.push(joinIfAll([`${passionPrefix}${role}`, skills], ' | '));
  }


  // Tone-influenced templates
  switch (tone) {
    case 'Professional':
      if (role && skills) generatedHeadlines.push(`🚀 ${role} leveraging ${skills} to achieve ${goal || 'impactful results'}`);
      break;
    case 'Creative':
      if (role && goal) generatedHeadlines.push(`🎨 Crafting ${goal} with ${skills || 'innovative solutions'} as a ${role}`);
      if (role) generatedHeadlines.push(`Envisioning new possibilities as a ${role}${skills ? ` skilled in ${skills}` : ''}`);
      break;
    case 'Confident':
      if (role && goal) generatedHeadlines.push(`💼 Leading ${goal} through ${skills || 'strategic expertise'} | ${role}`);
      if (role) generatedHeadlines.push(`Delivering excellence as a ${role}${skills ? ` with mastery in ${skills}` : ''}`);
      break;
    case 'Friendly':
      if (role && goal) generatedHeadlines.push(`🌟 Your go-to ${role} for ${skills || 'creative solutions'} - Let's achieve ${goal} together!`);
      if (role) generatedHeadlines.push(`Connecting and creating as a ${role}${skills ? `. Let's talk ${skills}!` : '.'}`);
      break;
    case 'Authoritative':
      if (role && skills) generatedHeadlines.push(`🛡️ Expert ${role} in ${skills}${goal ? ` | Driving ${goal}` : ''}`);
      if (role) generatedHeadlines.push(`Setting the standard as a ${role}${skills ? `, proficient in ${skills}` : ''}`);
      break;
    case 'Witty':
      if (role && skills) generatedHeadlines.push(`🧠 ${role} - My skills include ${skills} and making coffee disappear. Goal: ${goal || 'World domination (the nice kind)'}.`);
      if (role) generatedHeadlines.push(`Officially a ${role}. Unofficially a ${skills ? skills.split(',')[0].trim() + ' guru' : 'wizard'}. ${goal ? `Aiming for ${goal}.` : ''}`);
      break;
    default:
      if (role && skills) generatedHeadlines.push(`${role} | ${skills}`);
      break;
  }

  // Add a more generic one if still not enough
  if (generatedHeadlines.length < 3 && role) {
    generatedHeadlines.push(`${capitalize(tone)} ${role}${skills ? ` | ${skills}` : ''}${goal ? ` | Focused on ${goal}` : ''}`);
  }
  if (generatedHeadlines.length === 0 && role) {
     generatedHeadlines.push(`${role} - Ready for new opportunities`);
  } else if (generatedHeadlines.length === 0) {
    generatedHeadlines.push("Crafting the perfect professional presence."); // Fallback
  }


  // Ensure unique headlines and limit to 5-7
  const uniqueHeadlines = Array.from(new Set(generatedHeadlines.filter(h => h && h.trim() !== '')));
  const selectedHeadlines = uniqueHeadlines.slice(0, Math.min(uniqueHeadlines.length, 7) || 1);


  return NextResponse.json({ headlines: selectedHeadlines });
}
