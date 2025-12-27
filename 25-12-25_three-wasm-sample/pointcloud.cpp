#include <vector>
#include <cstdlib>

extern "C"
{
    // 点群を生成する
    float *generate_points(int count)
    {
        float *data = (float *)malloc(sizeof(float) * count * 3);

        for (int i = 0; i < count; i++)
        {
            data[i * 3 + 0] = 0.0f;
            data[i * 3 + 1] = (float)i * 0.1f;
            data[i * 3 + 2] = 0.0f;
        }
        return data;
    }

    void free_points(float *ptr)
    {
        free(ptr);
    }
}