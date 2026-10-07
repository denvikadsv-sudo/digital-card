import { NotFoundException } from '@nestjs/common';
import { Locale } from './locale.enum';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  const findUnique = jest.fn();
  const service = new ProfileService({ profile: { findUnique } } as never);

  beforeEach(() => findUnique.mockReset());

  it('looks the profile up by slug and locale', async () => {
    findUnique.mockResolvedValue({ id: 1, name: 'Denis' });

    await expect(service.getMain(Locale.EN)).resolves.toEqual({ id: 1, name: 'Denis' });
    expect(findUnique).toHaveBeenCalledWith({
      where: { slug_locale: { slug: 'main', locale: Locale.EN } },
    });
  });

  it('throws NotFoundException when the profile is not seeded', async () => {
    findUnique.mockResolvedValue(null);

    await expect(service.getMain(Locale.RU)).rejects.toBeInstanceOf(NotFoundException);
  });
});
