#include <cstdlib>

extern "C" {
    // count 個の点を生成する
    float* generate_points(int count) {
        float* data = (float*)malloc(sizeof(float) * count * 3);
        for (int i=0; i < count; i++) {
            data[i * 3 + 0] = static_cast<float>(rand()) / RAND_MAX * 2 - 1; // x [-1, 1]
            data[i * 3 + 1] = static_cast<float>(rand()) / RAND_MAX * 2 - 1; // y [-1, 1]
            data[i * 3 + 2] = static_cast<float>(rand()) / RAND_MAX * 2 - 1; // z [-1, 1]
        }
        return data;
    }

    // malloc したメモリを解放
    void free_points(float* ptr) {
        free(ptr);
    }
}