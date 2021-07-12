<template>
  <div class="form-create-course-container">
    <el-row :gutter="20">
      <el-col :span="15">
        <h3>Thông tin cơ bản</h3>
        <el-form ref="form" :model="form" :rules="rules" label-width="160px">
          <el-form-item label="Tên khoá học">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="Thời lượng khoá học" prop="duration">
            <div class="duration-field">
              <div class="field" style="margin-right: 10px; width: 70%;">
                <el-input v-model="form.duration" />
              </div>
              <div class="field">
                <el-select
                  v-model="form.durationType"
                  placeholder="Lựa chọn đơn vị thời gian"
                  style="width: 30%;"
                >
                  <el-option label="giây" value="giây" />
                  <el-option label="phút" value="phút" />
                </el-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="Ngày bắt đầu" prop="startDate">
            <el-date-picker
              v-model="form.startDate"
              type="date"
              placeholder="Lựa chọn thời gian học"
              style="width: 49.4%;"
            />
          </el-form-item>
          <el-form-item label="Ngày kết thúc" prop="endDate">
            <el-date-picker
              v-model="form.endDate"
              type="date"
              placeholder="Lựa chọn thời gian học"
              style="width: 49.4%;"
            />
          </el-form-item>
          <el-form-item label="Thông điệp ngắn" prop="shortMessage">
            <el-input v-model="form.shortMessage" />
          </el-form-item>
          <el-form-item label="Mô tả" prop="description">
            <el-input v-model="form.description" type="textarea" />
          </el-form-item>
          <el-form-item label="Trạng thái" prop="status">
            <el-switch v-model="form.status" type="switch" />
          </el-form-item>
          <el-form-item label="Độ tuổi tối thiểu" prop="minAge">
            <el-input style="width: 49.4%;" v-model="form.minAge" />
          </el-form-item>
          <el-form-item label="Hình ảnh" prop="picture">
            <el-upload
              :file-list="form.picture"
              :limit="1"
              :auto-upload="false"
              action="https://test.io"
              style="display: flex"
            >
              <el-button style="margin-right: 10px;">
                Chọn hình ảnh
              </el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button @click="onCancel">
              Huỷ
            </el-button>
            <el-button type="primary" @click="onSubmit('form')">
              Cập nhật
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="9">
        <h3>Danh sách giáo viên</h3>

        <div class="grid-content bg-purple"></div>
        <div class="grid-content bg-purple-light">
          <el-table
            v-loading="listLoading"
            :data="teachers"
            element-loading-text="Loading"
            fit
            highlight-current-row
            :show-header="false"
          >
            <el-table-column align="center" width="95">
              <template slot-scope="scope">
                <div class="block">
                  <el-avatar
                    :size="50"
                    :src="scope.row.avatarUrl"
                  ></el-avatar>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div>
                  <b>
                    {{ scope.row.name }}
                  </b>
                </div>
                <div style="font-size: 12px">
                  {{ scope.row.authors }}
                </div>
              </template>
            </el-table-column>

            <el-table-column align="center" width="80">
              <template slot-scope="scope">
                <i v-if="scope.row.status === 'OWNER'" class="el-icon-star-on" />
                <i v-else class="el-icon-s-tools" />
              </template>
            </el-table-column>

            <el-table-column align="right">
              <template>
                <el-button>Cài đặt</el-button>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template>
                <el-button>Xóa</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="15">
        <h3>Danh sách bài học</h3>
        <div class="grid-content bg-purple-light">
          <el-table
            :data="list"
            element-loading-text="Loading"
            fit
            highlight-current-row
            :show-header="false"
          >
            <el-table-column align="center" width="95">
              <template slot-scope="scope">
                <div class="block">
                  <el-avatar
                    :size="50"
                    :src="scope.row.lessonImageUrl"
                  ></el-avatar>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div>
                  <b>
                    {{ scope.row.name }}
                  </b>
                </div>
                <div style="font-size: 12px">
                  {{ scope.row.authors }}
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" width="80">
              <template slot-scope="scope">
                <i
                  class="icon-desc el-icon-s-data"
                  style="transform: rotate(90deg)"
                />
                <span>{{ scope.row.numberOfQuizzes }}</span>
              </template>
            </el-table-column>

            <el-table-column class-name="status-col" width="110" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.status" disabled> </el-switch>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template>
                <el-button>
                  Cài đặt
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="9">
        <h3>Danh sách học sinh</h3>
        <div class="grid-content bg-purple-light">
          <el-table
            :data="list"
            element-loading-text="Loading"
            fit
            highlight-current-row
            :show-header="false"
          >
            <el-table-column align="center" width="95">
              <template slot-scope="scope">
                <div class="block">
                  <el-avatar
                    :size="50"
                    :src="scope.row.courseImageUrl"
                  ></el-avatar>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div>
                  <b>
                    {{ scope.row.name }}
                  </b>
                </div>
                <div style="font-size: 12px">
                  {{ scope.row.authors }}
                </div>
              </template>
            </el-table-column>
            <el-table-column width="110" align="center">
              <template slot-scope="scope">
                <i class="icon-desc el-icon-time" />
                <span>{{ (scope.row.duration / 60).toFixed() }} phút</span>
              </template>
            </el-table-column>
            <el-table-column width="90" align="center">
              <template slot-scope="scope">
                <i class="icon-desc el-icon-user-solid"></i>
                {{ scope.row.teachers }}
              </template>
            </el-table-column>
            <el-table-column width="80" align="center">
              <template slot-scope="scope">
                <i class="icon-desc el-icon-user-solid"></i>
                {{ scope.row.members }}
              </template>
            </el-table-column>
            <el-table-column align="center" width="80">
              <template slot-scope="scope">
                <i class="icon-desc el-icon-notebook-2" />
                <span>{{ scope.row.lessons }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="80">
              <template slot-scope="scope">
                <i
                  class="icon-desc el-icon-s-data"
                  style="transform: rotate(90deg)"
                />
                <span>{{ scope.row.quizzes }}</span>
              </template> </el-table-column
            ><el-table-column align="center" width="90">
              <template slot-scope="scope">
                {{ scope.row.progress || 0 }} %
              </template>
            </el-table-column>
            <el-table-column class-name="status-col" width="110" align="center">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.status" disabled> </el-switch>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot-scope="scope">
                <el-button @click="handleEditCourse(scope.row.id)"
                  >Cài đặt</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  courseAction,
  COURSE_NAMESPACE,
  GET_COURSE,
  UPDATE_COURSE
} from '@/store/course/action.type'
import store from '@/store/index'
import { mapGetters } from 'vuex'
import { deference, reverseDay } from '@/utils/utils'

export default Vue.extend({
  name: 'UpdateCourse',
  async beforeRouteEnter(to, from, next) {
    await store.dispatch(courseAction(GET_COURSE), to.params.courseId)
    next()
  },
  data() {
    return {
      form: {
        id: '',
        name: '',
        duration: '',
        durationType: 'giây',
        date: '',
        shortMessage: '',
        description: '',
        status: false,
        minimumAge: '',
        maximumAge: '',
        picture: []
      },
      teachers: [
        {
          id: 1.0,
          avatarUrl:
            'https://lh3.googleusercontent.com/-nZVE9A4klypZX8uIp34BsCEpy4k7aJ6TfZvpeHZZHcKov_-navdndPYHT3ikrSO1e_ebQdCXV9NLhhCyok7U2qc_3raKFw0lGBu3Ut15Fn-KEwWgKFdgyFyiW8WjPxLhbw7P3ATRIMRUJxYyH6TEDuIQj7rsItXyrvsU1aevwfjtWPA2xbtB9qymA0nhp7fnhIfXqZZ6Apd4DzzsjBwBMsnoc7EG2a4s1l9u2iDtDv-qHHdrQfQY3GhKt8gOVwZlTYoTUeeCm5TopOgO3QhKN7hB-ZWaaX0UL_igOaq3pYx139g0Newa-NQpu-p5-kp7VS2iUFOT4dmmsnmWLplNKrrZU2EKTh9ed6ae7JGFn0VpWux0G9dD29BBvVRVYsCx083FauIHpwpo0xkHaCqW7P56GFn_wGPu-vsV698438rraWPmkMGPk9hj6OoPYJMwe5dEA6Aq7Bp6jHE97d_joNlrIC4BzFfQZJ23JWRbHMOnAe-nPDe2PUQl6cpKZrUU5GjXdFpmAuwWDSG77OwAXA8SHRvqepimPorwe4MGy33lJipkyFyw6GnkW3lo7Wc0_N_F0dS1AhvhFNEj9A1I6nSH5YHA2U8zL3hXmhgcTkBpbUrUmSVXipeiVpOrsEpF-TqoUdxD8ZTAq60VgacDpNti5kDEnHQ9SCjDXMb1EBvdkpNzsjZ8t4=w500-h750-no?authuser=2',
          fileId: null,
          username: 'trungb',
          name: 'Trung B',
          status: 'OWNER'
        },
        {
          id: 1036.0,
          avatarUrl:
            'https://photographer.com.vn/wp-content/uploads/2020/08/1596889696_Anh-avatar-dep-va-doc-dao-lam-hinh-dai-dien.jpg',
          fileId: null,
          username: 'trungb01',
          name: 'Trung Bui',
          status: 'PARTNER'
        }
      ],
      rules: {
        name: [
          { required: true, message: 'Không được để trống', trigger: 'change' }
        ],
        duration: [
          { required: true, message: 'Không được để trống', trigger: 'change' }
        ],
        date: [
          { required: true, message: 'Không được để trống', trigger: 'change' }
        ],
        description: [
          { max: 5000, message: 'Tối đa 5000 kí tự', trigger: 'change' }
        ],
        minAge: [
          { required: true, message: 'Không được để trống', trigger: 'change' }
        ],
        maximumAge: [
          { required: true, message: 'Không được để trống', trigger: 'change' }
        ]
      }
    }
  },

  methods: {
    formRef(
      formName: string
    ): Vue & { validate: (func: (valid: boolean) => boolean) => void } {
      return this.$refs[formName] as Vue & {
        validate: (func: (valid: boolean) => boolean) => void
      }
    },

    onCancel() {
      this.$router.push({
        path: '/courses/index'
      })
    },

    getInitData() {
      return {
        ...this.course.data,
        startDate: reverseDay(this.course.data.startDate),
        endDate: reverseDay(this.course.data.endDate),
        durationType: 'giây',
        status: this.course.data.status === 'ENABLE'
      }
    },

    onSubmit(formName: string) {
      this.formRef(formName).validate((valid: boolean) => {
        if (valid) {
          const courseTobeUpdated = deference(this.getInitData(), this.form, [
            'startDate',
            'endDate'
          ])
          store.dispatch(courseAction(UPDATE_COURSE), {
            courseId: this.form.id,
            courseTobeUpdated
          })
          alert('submit!')
          return true
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },

  mounted() {
    this.form = this.getInitData()
  },

  computed: {
    ...mapGetters(COURSE_NAMESPACE, ['course']),
    list(): string {
      return this.course.data.lessons
    }
  }
})
</script>

<style lang="scss" scoped>
.form-create-course {
  &-container {
    margin: 30px;

    .duration-field {
      display: flex;

      .field {
        flex: 1 0;
      }
    }
  }
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
