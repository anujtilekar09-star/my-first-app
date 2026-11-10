export function profileKey(profile = {}) {
  const fields = [
    'love',
    'good',
    'need',
    'paid',
    'learn',
    'market',
    'budget',
    'experience'
  ];

  return JSON.stringify(
    fields
      .map(key => String(profile[key] || '').trim())
      .concat(Number(profile.hours) || 10)
  );
}

export function rankIdeas(
  profile = {},
  hours = 80,
  ocean = 'all',
  catalog = []
) {
  return catalog
    .filter(idea =>
      idea.hours <= hours &&
      (ocean !== 'blue' || idea.competition < 50)
    )
    .sort((a, b) => b.score - a.score);
}

export function prospectScore(prospect) {
  return Math.min(
    100,
    30 +
      (prospect.signals?.length || 0) * 18 +
      (prospect.website ? 8 : 0) +
      (prospect.contact ? 8 : 0)
  );
}

export function csv(rows) {
  return rows
    .map(row =>
      row
        .map(value =>
          '"' +
          String(value ?? '').replaceAll('"', '""') +
          '"'
        )
        .join(',')
    )
    .join('\r\n');
}

export function draft(prospect, idea) {
  return `Subject: A small idea for ${prospect.company}

Hi ${prospect.contact || 'there'},

${
  prospect.signals?.length
    ? `I noticed your note about ${prospect.signals.join(' and ')}. `
    : ''
}I’m exploring ways to help ${idea.buyer.toLowerCase()} with ${idea.name.toLowerCase()}.

I’d like to put together ${idea.deliver.toLowerCase()} tailored to ${prospect.company}. Would you be open to seeing a short sample?

Best,
[Your name]`;
}
