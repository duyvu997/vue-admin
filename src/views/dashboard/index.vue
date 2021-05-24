<template>
  <div class="dashboard-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="160px"
    >
      <el-form-item label="Tên khoá học" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Thời lượng khoá học" prop="duration">
        <div class='duration-field'>
            <div class="field" style="margin-right: 10px">
              <el-input v-model="form.duration" />
            </div>
            <div class="field">
              <el-select
                v-model="form.durationType"
                placeholder="Lựa chọn đơn vị thời gian"
                style="width: 100%;"
              >
                <el-option
                  label="giây"
                  value="giây"
                />
                <el-option
                  label="phút"
                  value="phút"
                />
              </el-select>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="Thời gian học" prop="date">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="Lựa chọn thời gian học"
            style="width: 100%;"
          />
      </el-form-item>
      <el-form-item label="Thông điệp ngắn" prop="shortDesc">
        <el-input v-model="form.shortDesc" />
      </el-form-item>
      <el-form-item label="Mô tả" prop="desc">
        <el-input
          v-model="form.desc"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="Trạng thái" prop="status">
        <el-switch v-model="form.status" />
      </el-form-item>
      <el-form-item label="Độ tuổi tối thiểu" prop="minimumAge">
        <el-input v-model="form.minimumAge" />
      </el-form-item>
      <el-form-item label="Độ tuổi tối đa" prop="maximumAge">
        <el-input v-model="form.maximumAge" />
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
        <el-button
          type="primary"
          @click="onSubmit('form')"
        >
          Tạo
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'Dashboard'
})
export default class extends Vue {
  private form = {
    name: '',
    duration: '',
    durationType: 'giây',
    date: '',
    shortDesc: '',
    desc: '',
    status: false,
    minimumAge: '',
    maximumAge: '',
    picture: []
  };

  private rules = {
    name: [
      { required: true, message: 'Không được để trống', trigger: 'change' }
    ],
    duration: [
      { required: true, message: 'Không được để trống', trigger: 'change' }
    ],
    date: [
      { required: true, message: 'Không được để trống', trigger: 'change' }
    ],
    desc: [
      { max: 5000, message: 'Tối đa 5000 kí tự', trigger: 'change' }
    ],
    minimumAge: [
      { required: true, message: 'Không được để trống', trigger: 'change' }
    ],
    maximumAge: [
      { required: true, message: 'Không được để trống', trigger: 'change' }
    ]
  }

  private formRef(formName: string): Vue & { validate: (func: (valid: boolean) => boolean) => void } {
    return this.$refs[formName] as Vue & { validate: (func: (valid: boolean) => boolean) => void }
  }

  private onSubmit(formName: string) {
    this.formRef(formName).validate((valid: boolean) => {
      if (valid) {
        // TODO: call api submit data
        alert('submit!')
        return true
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  private onCancel() {
    this.$message({
      message: 'cancel!',
      type: 'warning'
    })
  }

  get name() {
    return UserModule.name
  }

  get roles() {
    return UserModule.roles
  }

  get pictureUrl() {
    return this.form.picture[0] ? this.form.picture[0] : ''
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;

    .duration-field {
      display: flex;

      .field {
        flex: 1 0
      }
    }
  }

}
</style>
