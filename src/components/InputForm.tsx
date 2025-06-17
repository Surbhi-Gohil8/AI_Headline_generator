type Props = {
  form: { role: string; skills: string; goal: string; tone: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

const inputBaseClasses =
  'w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transition-shadow shadow-sm hover:shadow-md';
const labelBaseClasses = 'block mb-2 text-sm font-medium text-indigo-300';

export default function InputForm({ form, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="role" className={labelBaseClasses}>
          Your Role
        </label>
        <input
          id="role"
          type="text"
          name="role"
          placeholder="e.g., Senior Software Engineer"
          value={form.role}
          onChange={onChange}
          className={inputBaseClasses}
        />
      </div>

      <div>
        <label htmlFor="skills" className={labelBaseClasses}>
          Key Skills
        </label>
        <input
          id="skills"
          type="text"
          name="skills"
          placeholder="e.g., React, Node.js, Cloud Architecture"
          value={form.skills}
          onChange={onChange}
          className={inputBaseClasses}
        />
      </div>

      <div>
        <label htmlFor="goal" className={labelBaseClasses}>
          Your Goal
        </label>
        <input
          id="goal"
          type="text"
          name="goal"
          placeholder="e.g., To lead innovative projects"
          value={form.goal}
          onChange={onChange}
          className={inputBaseClasses}
        />
      </div>

      <div>
        <label htmlFor="tone" className={labelBaseClasses}>
          Desired Tone
        </label>
        <select
          id="tone"
          name="tone"
          value={form.tone}
          onChange={onChange}
          className={`${inputBaseClasses} appearance-none`} // appearance-none to allow custom arrow if desired later
        >
          <option value="Professional">Professional</option>
          <option value="Creative">Creative</option>
          <option value="Confident">Confident</option>
          <option value="Friendly">Friendly</option>
          <option value="Authoritative">Authoritative</option>
          <option value="Witty">Witty</option>
        </select>
      </div>
    </div>
  );
}
